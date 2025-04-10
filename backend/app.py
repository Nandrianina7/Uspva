from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .models import db, User, File, Classe, Student, Matiere, Note, ClasseMatiere, TimeTable, Event
from dotenv import load_dotenv
from datetime import timedelta
from flask_jwt_extended import JWTManager
import os
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "allow_headers": ["Authorization", "Content-Type"],
    "supports_credentials": True}})

DATABASE_URL = os.getenv('DATA_BASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'my_secret'
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=7)
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token_cookie'
app.config['JWT_REFRESH_COOKIE_NAME'] = 'refresh_token_cookie'
JWTManager(app)
db.init_app(app)

with app.app_context():
    db.create_all()