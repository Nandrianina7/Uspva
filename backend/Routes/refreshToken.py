from flask_jwt_extended import get_jwt_identity, create_access_token, set_access_cookies
from flask import jsonify

def refresh():
  try:
    identity = get_jwt_identity()
    new_token_refresh = create_access_token(identity=identity)
    resp = jsonify({'access_token_cookie': new_token_refresh})
    set_access_cookies(resp, new_token_refresh)
    return resp, 200
  except Exception as e:
    return jsonify(error= f'Failed to refresh the token {e}'), 401