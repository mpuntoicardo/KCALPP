from typing import List, Dict
from flask import Flask, request, jsonify
from db import DatabaseConnection
import json
import os
import hashlib
import jwt
from functools import wraps
from flask_cors import CORS, cross_origin
import boto3
from werkzeug.utils import secure_filename
from bedca import footDetails, searchFood
import xmltodict
import json


app = Flask(__name__)
cors = CORS(app)
db = DatabaseConnection()


app.config['SECRET_KEY'] = '9a8ac0b100300d6c2b38dd30d7e3cb0b20e8668c427f366cf43a3c08f4743dd2'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not request.headers.get('Authorization'):
            return jsonify({'error': 'Token is missing'}), 401
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
    token = request.headers.get('Authorization').split(' ')[1]
    data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    current_user_email = data['email']
    return jsonify({'message': f'This is a protected endpoint. Current user: {current_user_email}'})


@app.route('/image', methods=['POST'])
@token_required
def upload_image():
    token = request.headers.get('Authorization').split(' ')[1]
    data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    email = str(data['email'])

    if not 'image' in request.files:
        return jsonify({'error': 'There is no image!'}), 400
    
    image = request.files['image']
    name = request.data.get['name']
    filename = secure_filename(image.filename)
    
    image.save(os.path.join("tmp", filename))
    connection = db.connect()
    cursor = connection.cursor()
    try:
        
        s3.upload_file(os.path.join("tmp", filename), "kcalpp", filename)
        url = f"https://kcalpp.s3.amazonaws.com/{filename}"
        print(type(email))
        cursor.execute("SELECT id FROM user WHERE email = %s", (email,))
        user_id = cursor.fetchone()

        data = '{}'

        cursor.execute("INSERT INTO history (user_id, name, url, data) VALUES (%s, %s, %s, %s)",
                       (str(user_id[0]), url, data))
        connection.commit()

        return jsonify({'image': url}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()

@app.route('/history', methods=['GET'])
@token_required
def history():
    token = request.headers.get('Authorization').split(' ')[1]
    data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    email = data['email']

    connection = db.connect()
    cursor = connection.cursor()
    
    try:
        cursor.execute("SELECT url, created_at, name, data FROM history WHERE user_id = (select id from user where email=%s) order by created_at desc", (email,))
        data = cursor.fetchall()

        history = []
        for d in data:
            aux = {}
            aux['url'] = d[0]
            aux['created_at'] = d[1]
            aux['name'] = d[2]
            aux['data'] = d[3]
            history.append(aux)

        return jsonify({'history': history}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()

@app.route('/food', methods=['GET'])
@token_required
def search_food():
    query = request.args.get('q') 

    if not query:
        return jsonify({'error': 'Indica el alimento a buscar'}), 400

    result = searchFood(query)
    result = xmltodict.parse(result)
    
    if not result['foodresponse']:
        return jsonify({'error': 'No se ha encontrado ningún resultado'}), 400

    return jsonify(result["foodresponse"]), 200

@app.route('/food/<foodId>', methods=['GET'])
@token_required
def search_food_details(foodId):
    query = foodId

    if not query:
        return jsonify({'error': 'Indica el alimento a buscar'}), 400

    result = footDetails(query)
    result = xmltodict.parse(result)
    
    if not result['foodresponse']:
        return jsonify({'error': 'No se ha encontrado ningún resultado'}), 400

    return jsonify(result["foodresponse"]), 200



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
