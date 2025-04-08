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

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

DATABASE_URL = os.getenv('DATA_BASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'my_secret'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
JWTManager(app)
db.init_app(app)

with app.app_context():
    db.create_all()