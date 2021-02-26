import psycopg2
from avatar import Avatar
from base64 import b64decode
from database_interaction import DataBase


class AvatarsBase(DataBase):
    def __init__(self, dbname: str, username: str, pswd: str, host: str, port: str, table_name: str):
        super().__init__(dbname, username, pswd, host, port, table_name)
        self.create_db()

    def create_db(self):
        """Creating connection, table and cursor"""
        self.conn.autocommit = True
        self.cur.execute(f"GRANT ALL PRIVILEGES ON DATABASE {self.dbname} to {self.username};")
        self.cur.execute(f"CREATE TABLE IF NOT EXISTS {self.table_name}"
                         f" (id VARCHAR(7), avatar TEXT)")
        self.conn.commit()

    def add_avatar(self, avatar: Avatar):
        """Adds avatar into the database"""
        self.cur.execute(f"INSERT INTO {self.table_name} VALUES ('{avatar.id}', '{avatar.avatar}')")

    def get_avatar(self, id: int):
        """Returns student by id"""
        self.cur.execute(f"SELECT * FROM {self.table_name} WHERE id={id}")
        result = self.cur.fetchone()
        if result:
            return Avatar(**result)
        else:
            return ''

    def delete_avatar(self, id: int):
        """Deletes avatar by id"""
        self.cur.execute(f"DELETE FROM {self.table_name} WHERE id={id};")
