from backend.models import db, User
from flask import jsonify, request

def signup():
  data = request.get_json()
  if not data or not all(keys in data for keys in ['user_name', 'email', 'password', 'firstname']):
    return jsonify({"error": 'Missing required field'}), 401
  email = data['email']
  name = data['user_name']
  firstname = data['firstname']
  password = data['password']

  user = User.query.filter_by(email=email).first()
  if user: 
    return jsonify({'error':'User already exit'}), 401
  new_user = User(
    nom_users = name,
    prenoms_users = firstname,
    email = email,
    password = password
  )
  db.session.add(new_user)
  db.session.commit()
  return jsonify({'message': 'User successfully registered'}), 200
