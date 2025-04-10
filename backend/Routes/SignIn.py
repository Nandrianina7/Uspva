
from flask import Blueprint, request, jsonify
from ..models import db, User
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta
ACCESS_EXPIRE = timedelta(minutes=1)
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
    access_token = create_access_token(identity=str(user.id_users))
    refresh_token = create_refresh_token(identity=str(user.id_users), expires_delta=None)
    resp = jsonify({"data": user_data, "acces_token": access_token, "refresh_token": refresh_token})
    resp.set_cookie(
        'access_token_cookie', 
        access_token, 
        httponly=True, 
        samesite='None', 
        secure=True, 
        max_age=ACCESS_EXPIRE.total_seconds()
    )
    resp.set_cookie(
        'refresh_token_cookie',
        refresh_token,
        httponly=True,
        samesite="None",
        secure=True
    )
    
    return resp, 200