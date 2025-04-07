
from flask import Blueprint, request, jsonify
from ..models import db, User
def signin():
    """
    Sign in a user and return a JWT token.
    """
    # Get the request body
    body = request.get_json()

    # Validate the request body
    if not body or not all(key in body for key in ['email', 'password']):
        return jsonify({"error": "Invalid request"}), 400

    # Extract email and password from the request body
    email = body['email']
    password = body['password']

    # Check if the user exists in the database
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    else:
        return jsonify({"message": "User found"}), 200

    # Verify the password
    # if not check_password_hash(user.password, password):
    #     return jsonify({"error": "Invalid password"}), 401

    # # Generate a JWT token
    # token = jwt.encode({"user_id": user.id}, app.config['SECRET_KEY'], algorithm='HS256')

    # return jsonify({"token": token}), 200