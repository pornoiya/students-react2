import psycopg2
from student import Student
from web import errors


class DataBase:
    def __init__(self, dbname: str, username: str, pswd: str, host: str, port: str, table_name:str):
        self.dbname = dbname
        self.username = username
        self.pswd = pswd
        self.host = host
        self.port = port
        self.table_name = table_name
        self.conn = psycopg2.connect(database=self.dbname, user=self.username,
                                     password=self.pswd, host=self.host, port=self.port)
        self.cur = self.conn.cursor()
        self.create_db()

    def create_db(self):
        """Creating connection, table and cursor"""
        self.conn.autocommit = True
        self.cur.execute(f"GRANT ALL PRIVILEGES ON DATABASE {self.dbname} to {self.username};")
        self.cur.execute(f"CREATE SEQUENCE IF NOT EXISTS counter START 1;")
        self.cur.execute(f"CREATE TABLE IF NOT EXISTS {self.table_name}"
                         f" (id INTEGER, full_name TEXT, rating FLOAT, "
                         f"age INTEGER, photo TEXT, specialty TEXT, "
                         f"student_group TEXT, sex CHAR(1), colour CHAR(7))")
        self.conn.commit()

    def add_student(self, student: Student):
        """Adds student into the database"""
        self.cur.execute(f"SELECT EXISTS (SELECT TRUE FROM {self.table_name}"
                         f" WHERE full_name='{student.full_name}' AND rating={student.rating}"
                         f" AND age={student.age} AND student_group='{student.group}' AND sex='{student.sex}');")
        exists = self.cur.fetchone()[0]
        if not exists:
            self.cur.execute(f"INSERT INTO {self.table_name} VALUES (nextval('counter'), {student})")
        else:
            raise errors.StudentExists(student)

    def get_student_by_id(self, id: int) -> Student:
        """Returns student by id"""
        self.cur.execute(f"SELECT * FROM {self.table_name} WHERE id={id}")
        result = self.cur.fetchone()
        if result:
            return Student(*result)
        else:
            raise errors.StudentNotFound("id")

    def get_student_by_full_name(self, full_name: str) -> list:
        """Returns list of students with entered name"""
        self.cur.execute(f"SELECT * FROM {self.table_name} WHERE full_name='{full_name}'")
        result = self.cur.fetchall()
        if result:
            return [Student(*tuple).properties_list() for tuple in result]
            # return [Student(*tuple[1:]).properties_list() for tuple in result]
        else:
            raise errors.StudentNotFound("name")

    def delete_student_by_id(self, id: int):
        """Deletes student by id"""
        self.cur.execute(f"DELETE FROM {self.table_name} WHERE id={id};")

    def get_all_students(self):
        """Gets all students from table"""
        self.cur.execute(f"SELECT * FROM {self.table_name}")
        result = self.cur.fetchall()
        if result:
            return [Student(*tuple) for tuple in result]
        else:
            return None
