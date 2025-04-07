from flask import Blueprint
from . SignIn import signin


# Création du Blueprint pour les routes
api = Blueprint('routes', __name__)

@api.route('/signin', methods=['POST'])
def signin():
    return signin()


# Vous pouvez ajouter d'autres fichiers de routes ici