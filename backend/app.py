from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db, User, File, Classe, Student, Matiere, Note, ClasseMatiere, TimeTable, Event

with app.app_context():
    db.create_all()

app = Flask(__name__)

# Configuration de la connexion PostgreSQL
# natou = anarana user any amin postgresql
# root = tenimiafina
# localhost = ip an'ny serveur
# 5432 = port an'ny serveur
# usvpa = anarana database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://natou:root@localhost:5432/usvpa'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)