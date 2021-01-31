# Students app

Students app -- веб-приложение, позволяющее получить список студентов, добавлять/удалять студента по id.

## Usage of API
GET REQUEST: 
get a student
```bash
curl -i http://localhost:8080/students/api/v1.0/students_list/<id: id of student>
```
DELETE REQUEST:
delete a student
```bash
curl -X DELETE http://localhost:8080/students/api/v1.0/students_list/<id: id of student>
```
POST REQUEST:
add a student
```bash
curl -i -H "Content-Type: application/json" -X POST -d "{\"id\": 3232, \"full_name\":\"Кихтенко Татьяна Михайловна\", \"rating\":100, \"age\":20, \"photo_link\": \"http:/IIIvan\", \"speciality\":\"Математика и КН\", \"group\":\"КН-302\", \"sex\":\"f\", \"fav_colour\":\"red\"}" http://localhost:8080/students/api/v1.0/students_list
```

## Автор
@pornoiya
