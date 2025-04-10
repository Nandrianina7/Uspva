from flask_jwt_extended import get_jwt_identity
from flask import jsonify
from backend.models import db, User

def getUserData():
  user_id = get_jwt_identity()
  user = User.query.get(int(user_id))
  if not user:
    return jsonify({'error': 'Not user found'}), 404
  current_user_data = {
    "name": user.nom_users,
    "firstname": user.prenoms_users,
    "birthday": user.date_naiss,
    "email": user.email
  }
  return jsonify(data = current_user_data), 200
  

