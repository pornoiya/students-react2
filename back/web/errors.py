class DataBaseException(Exception):
    message: str
    code: int


class StudentExists(DataBaseException):
    message = "The student already exists"
    code = 400


class StudentNotFound(DataBaseException):
    def __init__(self, column_name: str):
        self.message = self.message.format(column_name)
    message = "Student with this {} does not exist"
    code = 404


class InvalidData(Exception):
    message: str


class InvalidSexException(InvalidData):
    message: str


class NotFullNameException(InvalidData):
    message: str


class InvalidStudentAge(InvalidData):
    message: str
