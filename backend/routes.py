from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import User
from backend import db

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Utilisateur créé avec succès !'})

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Connexion réussie !', 'user_id': user.id})
    return jsonify({'message': 'Échec de la connexion.'}), 401

@api.route('/dashboard/<user_id>', methods=['GET'])
def dashboard(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        return jsonify({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email
        })
    return jsonify({'message': 'Utilisateur non trouvé !'}), 404
