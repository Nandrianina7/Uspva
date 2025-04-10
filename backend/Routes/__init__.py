from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .SignIn import signin as signin_controller
from .refreshToken import refresh as token_refresh
from .getUser import getUserData
from .Event import addEvent as add_event_controller
from .Event import get_events as get_event_controller
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

@api.route('/event', methods=['GET'])
@jwt_required()
def get_event():
    return get_event_controller()

@api.route('/event', methods=['POST'])
@jwt_required()
def add_event():
    return add_event_controller()