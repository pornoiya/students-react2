from flask import Flask, abort, request, jsonify, make_response
from database_interaction import DataBase
from student import Student

app = Flask(__name__)
root = "students"


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": "Not found"}), 404)


@app.errorhandler(400)
def already_exists(error):
    return make_response(jsonify({'error': 'The user already exists'}), 400)


@app.route(f'/{root}/api/v1.0/students_list/<int:id>', methods=['GET'])
def get_student_by_id(id: int):
    try:
        return db.get_student_by_id(id).__repr__()
    except KeyError:
        abort(404)


@app.route(f'/{root}/api/v1.0/students_list/<int:id>', methods=['DELETE'])
def delete_student_by_id(id: int):
    try:
        db.delete_student_by_id(id)
        return jsonify({201: "Successfully deleted"})
    except KeyError:
        abort(404)


@app.route(f'/{root}/api/v1.0/students_list', methods=['POST'])
def add_student():
    """curl -i -H "Content-Type: application/json" -X POST -d "{\"full_name\":\"Read a book\", \"rating\":12.09, \"age\":19, \"photo_link\": \"hpppp\", \"speciality\":\"ee\", \"group\":\"1111\", \"sex\":\"f\", \"fav_colour\":\"111111\"}" http://localhost:5000/students/api/v1.0/students_list
"""
    try:
        prop_check = ["full_name", "rating", "age", "photo_link", "speciality", "group", "sex", "fav_colour"]
        blob = request.get_json(force=True)
        for prop in prop_check:
            if prop not in blob:
                abort(400)

        s = {prop: blob[prop] for prop in prop_check}
        db.add_student(Student(**s))
        return jsonify({200: "Successfully added"}), 201
    except KeyError:
        abort(400)

    # root_url might be http://localhost/todo/api/v1.0/


if __name__ == '__main__':
    db = DataBase("students_test", "test_user", "qwerty", "localhost", "5432", "students")
    app.run(debug=True)
    db.conn.close()
