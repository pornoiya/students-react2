import psycopg2
from student import Student
from web import errors
from database_interaction import DataBase


class StudentsBase(DataBase):
    def __init__(self, dbname: str, username: str, pswd: str, host: str, port: str, table_name: str):
        super().__init__(dbname, username, pswd, host, port, table_name)
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
