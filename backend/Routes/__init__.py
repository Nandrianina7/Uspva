from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .SignIn import signin as signin_controller
from .refreshToken import refresh as token_refresh
from .getUser import getUserData
api = Blueprint('api', __name__)

@api.route('/signin', methods=['POST'])
def signin():
    return signin_controller()

@api.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    return token_refresh()

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected(): 
    current_user = get_jwt_identity()
    return jsonify(logged_as=current_user), 200

@api.route('/me', methods=['GET'])
@jwt_required()
def current_user():
    return getUserData()