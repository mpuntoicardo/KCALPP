from typing import List, Dict
from flask import Flask, request, jsonify
from db import DatabaseConnection
import json
import hashlib
import jwt
from functools import wraps
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
db = DatabaseConnection()

app.config['SECRET_KEY'] = '9a8ac0b100300d6c2b38dd30d7e3cb0b20e8668c427f366cf43a3c08f4743dd2'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization').split(' ')[1]
        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'error': 'Invalid token'}), 401

        return f(*args, **kwargs)

    return decorated


@app.route('/')
def index() -> str:
    return json.dumps({'favorite_colors': "asd"})


@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    name = data.get('name')

    if not username or not password or not email or not name:
        return jsonify({'error': 'Username, name password and email are required'}), 400

    try:
        connection = db.connect()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({'error': 'Email already exists'}), 409
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        cursor.execute("INSERT INTO user (username, password, email, name) VALUES (%s, %s, %s, %s)",
                       (username, hashed_password, email, name))
        connection.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    password = data.get('password')
    email = data.get('email')

    # Check if username and password are provided
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        connection = db.connect()
        cursor = connection.cursor()

        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        cursor.execute("SELECT * FROM user WHERE email = %s AND password = %s", (email, hashed_password))
        user = cursor.fetchone()
        if not user:
            return jsonify({'error': 'Invalid username or password'}), 401

        # Generate JWT token
        token = jwt.encode({'email': email}, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()


@app.route('/protected', methods=['GET'])
@token_required
def protected():
    return jsonify({'message': 'This is a protected endpoint'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
