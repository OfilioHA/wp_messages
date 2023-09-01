from flask import Blueprint, jsonify, request;
from instance.models.Phone import Phone
from instance.models import db;

phone_router = Blueprint('phone', __name__, url_prefix='/phone');

@phone_router.route('/', methods=['GET'])
def index():
    phones = Phone.query.all()
    phones = [phone.as_dict() for phone in phones]
    return jsonify(phones)

@phone_router.route('/', methods=['POST'])
def create():
    req = request.get_json(force=True);
    new_phone = Phone(
        req['number'],
        req['contact']
    );
    db.session.add(new_phone);
    db.session.commit();
    return jsonify({})

@phone_router.route('/', methods=['PUT'])
def edit():
    req = request.get_json(force=True);
    phone = Phone.query.get(req['id']);
    phone.number = req['number'];
    phone.contact = req['contact'];
    db.session.commit();
    return jsonify({})

@phone_router.route('/<int:phone_id>', methods=['DELETE'])
def delete(phone_id):
    phone = Phone.query.get(phone_id);
    db.session.delete(phone);
    db.session.commit();
    return jsonify({})



