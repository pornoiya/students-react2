# Students app

Students app -- веб-приложение, позволяющее получить список студентов, добавлять/удалять студента по id.

## Usage of API
GET REQUEST: 
get a student
```bash
curl -i http://localhost:5000/students/api/v1.0/students_list/<id: id of student>
```
DELETE REQUEST:
delete a student
```bash
curl -X DELETE http://localhost:5000/students/api/v1.0/students_list/<id: id of student>
```
POST REQUEST:
add a student
```bash
curl -i -H "Content-Type: application/json" -X POST -d "{\"full_name\":\"Ivanov Ivan Ivanovich\", \"rating\":10, \"age\":21, \"photo_link\": \"http:/IIIvan\", \"speciality\":\"lawyer\", \"group\":\"1111\", \"sex\":\"f\", \"fav_colour\":\"MEN368001\"}" http://localhost:5000/students/api/v1.0/students_list
```

## Автор
@pornoiya