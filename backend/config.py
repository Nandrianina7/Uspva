import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATA_BASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev_key')
