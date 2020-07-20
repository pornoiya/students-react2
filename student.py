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
        raise ValueError(f"Entered gender {sex} does not exist\nPlease enter either F(Ж) or M(М)")

    @staticmethod
    def set_full_name(name: str):
        """Checks if name contains first, middle and last names"""
        if len(name.split(" ")) < 3:
            raise ValueError("Please enter your full name including your first, middle and last names")
        return name

    @staticmethod
    def set_age(age: int):
        """Checks if the age is a decent value
        i.e. positive integer greater than 14"""
        if age <= 0:
            raise ValueError("Age can't be a negative value")
        elif age < 15:
            raise ValueError("Too Young to be a student")
        elif not isinstance(age, int):
            raise ValueError("Enter your full age")
        return age
