from flask import Blueprint
from .SignIn import signin as signin_controller

api = Blueprint('api', __name__)

@api.route('/signin', methods=['POST'])
def signin():
    return signin_controller()
