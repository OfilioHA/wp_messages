from flask import Blueprint, current_app
from .phoneController import phone_router
from .messageController import message_router

api = Blueprint('api', __name__, url_prefix='/api');
api.register_blueprint(phone_router);
api.register_blueprint(message_router);