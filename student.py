from web import errors


class Student:
    def __init__(self, full_name: str, rating: float,
                 age: int, photo_link: str, speciality: str,
                 group: str, sex: str, fav_colour: str):
        self.full_name = self.set_full_name(full_name)
        self.rating = rating
        self.age = self.set_age(age)
        self.photo = photo_link
        self.speciality = speciality
        self.group = group
        self.sex = self.set_sex(sex)
        self.favourite_colour = fav_colour

    def __repr__(self):
        return f"'{self.full_name}', {self.rating}, {self.age}, '{self.photo}', '{self.speciality}'," \
               f" '{self.group}', '{self.sex}', '{self.favourite_colour}'"

    def properties_list(self):
        return [self.full_name, self.rating, self.age,
                self.photo, self.speciality, self.group,
                self.sex, self.favourite_colour]

    @staticmethod
    def set_sex(sex: str):
        """Suppose, there is only two genders
        checks if the sex exist"""
        if sex.lower() in "fmжм":
            return sex
        raise errors.InvalidSexException(f"Entered gender '{sex}' does not exist\nPlease enter either F(Ж) or M(М)")

    @staticmethod
    def set_full_name(name: str):
        """Checks if name contains first, middle and last names"""
        if len(name.split(" ")) < 3:
            raise errors.NotFullNameException("Please enter your "
                                              "full name including your first, middle and last names")
        return name

    @staticmethod
    def set_age(age: int):
        """Checks if the age is a decent value
        i.e. positive integer greater than 14"""
        if not isinstance(age, int):
            raise errors.InvalidStudentAge("Age must be an integer")
        elif age <= 0:
            raise errors.InvalidStudentAge("Age must be a positive integer")
        elif age < 15:
            raise errors.InvalidStudentAge("Constructed student is too young")
        return age