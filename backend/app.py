from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db, User, File, Classe, Student, Matiere, Note, ClasseMatiere, TimeTable, Event
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
DATABASE_URL = os.getenv('DATA_BASE_URL')
with app.app_context():
    db.create_all()

# Configuration de la connexion PostgreSQL
# natou = anarana user any amin postgresql
# root = tenimiafina
# localhost = ip an'ny serveur
# 5432 = port an'ny serveur
# usvpa = anarana database
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)