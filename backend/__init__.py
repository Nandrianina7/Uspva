from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Configuration
DATABASE_URL = os.getenv('DATA_BASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# ✅ Importer db APRÈS création de app pour éviter l'import circulaire
from backend.models import db
db.init_app(app)

# Enregistrer le blueprint
from backend.Routes import api
app.register_blueprint(api, url_prefix='/api')

# Créer les tables
with app.app_context():
    db.create_all()
