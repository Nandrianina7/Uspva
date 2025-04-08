from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager
from datetime import timedelta

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
JWTManager(app)
DATABASE_URL = os.getenv('DATA_BASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'my_secret'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

from backend.models import db
db.init_app(app)

from backend.Routes import api
app.register_blueprint(api, url_prefix='/api')

with app.app_context():
    db.create_all()
