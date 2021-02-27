import unittest
from student import Student
from web.errors import InvalidSexException,\
    NotFullNameException, InvalidStudentAge


class TestStudentConstruction(unittest.TestCase):
    def test_setting_incorrect_sex(self):
        self.assertRaises(InvalidSexException, Student.set_sex, "mf")

    def test_setting_incorrect_name(self):
        self.assertRaises(NotFullNameException, Student.set_full_name, "Vasya Pupkin")

    def test_setting_negative_age(self):
        self.assertRaises(InvalidStudentAge, Student.set_age, -12)

    def test_setting_too_young_age(self):
        self.assertRaises(InvalidStudentAge, Student.set_age, 11)

    def test_appropriate_data(self):
        test_student = {"full_name": "Ivanov Ivan Ivanovich", "rating": 11, "age": 19,
                        "photo_link": "http://IvanovII", "sex": "m", "group": "MEN19099",
                        "speciality": "programmer", "fav_colour": "ffffff"}
        s = Student(**test_student)
        self.assertSetEqual(set(s.properties_list()), set(test_student.values()))