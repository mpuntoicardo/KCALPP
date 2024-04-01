import mysql.connector

class DatabaseConnection:
    _instance = None
    
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
            cls._instance.connection = None
        return cls._instance

    def connect(self):
        if not self.connection:
            config = {
                'user': 'user',
                'password': 'user',
                'host': 'db',
                'port': '3306',
                'database': 'kcalpp'
            }
            self.connection = mysql.connector.connect(**config)
            print("Connected to database")
        return self.connection

    def close(self):
        if self.connection:
            self.connection.close()
            self.connection = None
            print("Connection closed")

# Example usage:
if __name__ == "__main__":
    db_connection = DatabaseConnection()
    connection = db_connection.connect()
    db_connection.close()
