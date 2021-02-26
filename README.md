# Students App

Students App –– простой интерфейс работы со списком студентов. Можно просматривать список студентов, удалить студента, добавить студента.
## Технологии
Для бэкенда я использовала докер, flask, postgres базу данных
## Подготовка
- понадобится докер
- понадобятся зависимости, которые есть в requirements.txt. установка –– pip3 install requirements.txt
## Usage of API
Реализована обработка 3 необходимых запросов:
GET REQUEST: 
Получить список студентов
```bash
curl -i http://localhost:8080/students/api/v1.0/students_list/
```
DELETE REQUEST:
удалить студента по айди
```bash
curl -X DELETE http://localhost:8080/students/api/v1.0/students_list/<id: id of student>
```
POST REQUEST:
добавить студента
```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"id":"212","full_name":"Абукаров Алексей Васильевич", "rating": 23, "age": 21, "photo_link": "link", "speciality": "Математика", "group": "МТ-201", "sex": "m", "fav_colour": "black"}' \
  http://localhost:8080/students/api/v1.0/students_list/
```

## Автор
@pornoiya
