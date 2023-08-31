from flask import Blueprint, jsonify;

phone_router = Blueprint('phone', __name__, url_prefix='/phone');

@phone_router.route('/', methods=['GET'])
def index():
    return jsonify({
        'caca': 'toro'
    })



