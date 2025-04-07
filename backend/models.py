from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id_users = db.Column(db.Integer, primary_key=True)
    nom_users = db.Column(db.String(100))
    prenoms_users = db.Column(db.String(100))
    sexe = db.Column(db.String(10))
    email = db.Column(db.String(120), unique=True, nullable=False)
    date_naiss = db.Column(db.Date)
    adresse = db.Column(db.String(200))
    contact = db.Column(db.String(20))
    attribute = db.Column(db.String(50))
    password = db.Column(db.String(200))  # à sécuriser (hash)

    files = db.relationship('File', backref='uploader', lazy=True)
    timetable = db.relationship('TimeTable', backref='prof', lazy=True)


class File(db.Model):
    __tablename__ = 'file'
    id_file = db.Column(db.Integer, primary_key=True)
    name_file = db.Column(db.String(100))
    url = db.Column(db.String(255))
    type_file = db.Column(db.String(50))
    id_uploader = db.Column(db.Integer, db.ForeignKey('users.id_users'))


class Classe(db.Model):
    __tablename__ = 'classe'
    id_class = db.Column(db.Integer, primary_key=True)
    nom_class = db.Column(db.String(100))

    students = db.relationship('Student', backref='classe', lazy=True)
    timetable = db.relationship('TimeTable', backref='classe', lazy=True)


class Student(db.Model):
    __tablename__ = 'student'
    id_student = db.Column(db.Integer, primary_key=True)
    name_student = db.Column(db.String(100))
    firstname_student = db.Column(db.String(100))
    date_naiss = db.Column(db.Date)
    sexe = db.Column(db.String(10))
    id_classe = db.Column(db.Integer, db.ForeignKey('classe.id_class'))
    university_year = db.Column(db.String(20))

    notes = db.relationship('Note', backref='etudiant', lazy=True)


class Matiere(db.Model):
    __tablename__ = 'matiere'
    id_matiere = db.Column(db.Integer, primary_key=True)
    nom_matiere = db.Column(db.String(100))

    notes = db.relationship('Note', backref='matiere', lazy=True)
    class_matieres = db.relationship('ClasseMatiere', backref='matiere', lazy=True)
    timetable = db.relationship('TimeTable', backref='matiere', lazy=True)


class Note(db.Model):
    __tablename__ = 'note'
    id_note = db.Column(db.Integer, primary_key=True)
    id_etudiant = db.Column(db.Integer, db.ForeignKey('student.id_student'))
    id_matiere = db.Column(db.Integer, db.ForeignKey('matiere.id_matiere'))
    note = db.Column(db.Float)
    date_note = db.Column(db.Date, default=datetime.utcnow)
    type_note = db.Column(db.String(50))  # ex: contrôle, examen


class ClasseMatiere(db.Model):
    __tablename__ = 'classe_matiere'
    id = db.Column(db.Integer, primary_key=True)
    id_classe = db.Column(db.Integer, db.ForeignKey('classe.id_class'))
    id_matiere = db.Column(db.Integer, db.ForeignKey('matiere.id_matiere'))


class TimeTable(db.Model):
    __tablename__ = 'time_table'
    id_timetable = db.Column(db.Integer, primary_key=True)
    id_classe = db.Column(db.Integer, db.ForeignKey('classe.id_class'))
    id_matiere = db.Column(db.Integer, db.ForeignKey('matiere.id_matiere'))
    id_user = db.Column(db.Integer, db.ForeignKey('users.id_users'))  # prof
    day = db.Column(db.String(20))  # ex: Lundi
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    classroom = db.Column(db.String(100))


class Event(db.Model):
    __tablename__ = 'event'
    id_event = db.Column(db.Integer, primary_key=True)
    name_event = db.Column(db.String(100))
    date = db.Column(db.Date)
    check = db.Column(db.Boolean, default=False)
    observation = db.Column(db.String(255))
