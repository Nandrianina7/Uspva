from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .models import db, User, File, Classe, Student, Matiere, Note, ClasseMatiere, TimeTable, Event
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

# Configurations AVANT l'initialisation de la DB
DATABASE_URL = os.getenv('DATA_BASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
