from flask import Flask, abort, request, jsonify, make_response
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


@app.route(f'/{root}/api/v1.0/students_list/', methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH'])
def get_students():
    def handler():
        if lines:
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

    def post_handler():
        try:
            prop_check = ["id", "full_name", "rating", "age", "photo_link", "speciality", "group", "sex",
                          "fav_colour"]
            blob = request.get_json(force=True)
            for prop in prop_check:
                if prop not in blob:
                    abort(400)

            s = {prop: blob[prop] for prop in prop_check}
            db.add_student(Student(**s))
            return jsonify({"code": 200, "message": "Студент успешно добавлен!"})

        except errors.StudentExists as e:
            return make_response(jsonify({"code": e.code, "message": e.message}), e.code)

    methods = {'GET': handler,
               'HEAD': handler,
               'OPTIONS': handler,
               'POST': post_handler
               }
    lines = db.get_all_students()
    return methods[request.method]()


@app.route(f'/{root}/api/v1.0/students_list/<int:id>', methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'])
def delete_student_by_id(id: int):
    try:
        db.delete_student_by_id(id)
        return jsonify({"code": 200, "message": "Successfully deleted"}), 200
    except errors.StudentNotFound as e:
        return make_response(jsonify({"code": e.code, "error": e.message}), e.code)
