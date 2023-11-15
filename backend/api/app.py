from flask import Flask, jsonify, make_response, request
from flask_mysqldb import MySQL
import os

def create_app():
    app = Flask(__name__)
    app.config['MYSQL_HOST'] = os.environ.get('MYSQL_HOST')
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = os.environ.get('MYSQL_PASSWORD')
    app.config['MYSQL_DB'] = os.environ.get('MYSQL_DB')
    return app

app = create_app()
mysql = MySQL(app)

@app.route('/', methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return make_response(jsonify({"message": "I'm a teapot"}), 200)

if __name__=='__main__':
    app.run(host='0.0.0.0', port=80, debug=True)

