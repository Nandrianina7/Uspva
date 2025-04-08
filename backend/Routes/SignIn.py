
from flask import Blueprint, request, jsonify
from ..models import db, User
from flask_jwt_extended import create_access_token
def signin():
    """
    Sign in a user and return a JWT token.
    """
    body = request.get_json()

    if not body or not all(key in body for key in ['email', 'password']):
        return jsonify({"error": "Invalid request"}), 400

    email = body['email']
    password = body['password']

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user_data = {
        "id": user.id_users,
        "name": user.nom_users,
        "firstname": user.prenoms_users,
        "birthday": user.date_naiss,
        "email": user.email
    }
    access_token = create_access_token(user_data)
    
    return jsonify({"data": user_data, "acces_token": access_token}), 200