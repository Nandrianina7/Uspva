
from flask import Blueprint, request, jsonify
from ..models import db, User
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
    else:
        return jsonify({"message": "User found"}), 200