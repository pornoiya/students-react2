from flask import Flask, abort, request, jsonify, make_response, redirect, url_for
from student import Student
from database_interaction import DataBase
from web import errors
from flask_cors import CORS
from config import config

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ALLOW_HEADERS'] = '*'
app.config['CORS_ALLOW_METHODS'] = ['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE']

CORS(app, resources={r"/*": {"origins": "*"}})
root = "students"
db = DataBase(config.DB_NAME, config.USER_NAME, config.PASSWORD,
              config.DB_HOST, config.DB_PORT, config.DB_TABLE_NAME)


@app.route('/success/<name>')
def success(name):
    return 'welcome %s' % name


@app.route(f'/{root}/api/v1.0/students_list/<int:id>', methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'])
def get_student_by_id(id: int):
    try:
        s = db.get_student_by_id(id)
        return jsonify({"student": {"full_name": s.full_name, "rating": s.rating, "age": s.age,
                                    "photo_link": s.photo, "group": s.group, "speciality": s.speciality,
                                    "sex": s.sex, "fav_colour": s.favourite_colour,
                                    "id": s.id}}), 200
    except errors.StudentNotFound as e:
        return make_response(jsonify({"error": e.message}), e.code)


@app.route(f'/{root}/api/v1.0/students_list/', methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'])
def get_students():
    def get():
        if lines:
            app.logger.info('%s logged in successfully')

            students = [{"student": {
                "full_name": line.full_name, "rating": line.rating,
                "age": line.age, "photo_link": line.photo,
                "speciality": line.speciality, "group": line.group,
                "sex": line.sex, "fav_colour": line.favourite_colour,
                "id": line.id
            }} for line in lines]
        else:
            students = None
        return jsonify({"students": students}), 200

    def post():
        try:
            if request.method == 'POST':
                prop_check = ["id", "full_name", "rating", "age", "photo_link", "speciality", "group", "sex",
                              "fav_colour"]
                blob = request.get_json(force=True)
                app.logger.info('%s logged in successfully', str(blob))
                for prop in prop_check:
                    if prop not in blob:
                        abort(400)

                s = {prop: blob[prop] for prop in prop_check}
                db.add_student(Student(**s))
                return jsonify({200: "Successfully added"})
            else:
                return jsonify({200: "Successfully no"})

        except errors.StudentExists as e:
            return make_response(jsonify({"error": e.message}), e.code)

    methods = {'GET': get,
               'HEAD': get,
               'OPTIONS': get,
               'POST': post
               }
    lines = db.get_all_students()
    return methods[request.method]()


@app.route(f'/{root}/api/v1.0/students_list/<int:id>', methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'])
def delete_student_by_id(id: int):
    try:
        db.delete_student_by_id(id)
        return jsonify({"message": "Successfully deleted"}), 201
    except errors.StudentNotFound as e:
        return make_response(jsonify({"error": e.message}), e.code)


@app.route(f'/{root}/api/v1.0/students_list', methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'])
def add_student():
    try:
        if request.method == 'POST':
            prop_check = ["id", "full_name", "rating", "age", "photo_link", "speciality", "group", "sex", "fav_colour"]
            blob = request.get_json(force=True)
            app.logger.info('%s logged in successfully', str(blob))
            for prop in prop_check:
                if prop not in blob:
                    abort(400)

            s = {prop: blob[prop] for prop in prop_check}
            db.add_student(Student(**s))
            return jsonify({200: "Successfully added"})
        else:
            return jsonify({200: "Successfully no"})

    except errors.StudentExists as e:
        return make_response(jsonify({"error": e.message}), e.code)




# def add_student():
#     try:
#         prop_check = ["full_name", "rating", "age", "photo_link", "speciality", "group", "sex", "fav_colour"]
#         blob = request.form["student"]
#         for prop in prop_check:
#             if prop not in blob:
#                 abort(400)
#
#         s = {prop: blob[prop] for prop in prop_check}
#         db.add_student(Student(**s))
#         return jsonify({200: "Successfully added"}), 200
#     except errors.StudentExists as e:
#         return make_response(jsonify({"error": e.message}), e.code)


