from flask import Flask, abort, request, jsonify, make_response
from student import Student
from students_base import StudentsBase
from web import errors
from flask_cors import CORS
from config import config

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ALLOW_HEADERS'] = '*'
app.config['CORS_ALLOW_METHODS'] = ['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE']

CORS(app, resources={r"/*": {"origins": "*"}})
root = "students"
db = StudentsBase(config.DB_NAME, config.USER_NAME, config.PASSWORD,
              config.DB_HOST, config.DB_PORT, config.DB_TABLE_NAME)


@app.route(f'/{root}/api/v1.0/students_list/', methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'])
def handle_student_request():
    def get():
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

    def post():
        try:
            prop_check = ["id", "full_name", "rating", "age", "photo_link",
                          "speciality", "group", "sex", "fav_colour", "email"]
            blob = request.get_json(force=True)
            for prop in prop_check:
                if prop not in blob:
                    abort(400)

            s = {prop: blob[prop] for prop in prop_check}
            db.add_student(Student(**s))
            return make_response(jsonify({"code": 200, "message": "Студент успешно добавлен"}), 200)

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
        return jsonify({"message": "Successfully deleted"}), 200
    except errors.StudentNotFound as e:
        return make_response(jsonify({"error": e.message}), e.code)
