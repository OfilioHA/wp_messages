from flask import Blueprint, jsonify, request
from instance.models.Phone import Phone
from instance.models import db
import math

phone_router = Blueprint('phone', __name__, url_prefix='/phone')

@phone_router.route('/', methods=['GET'])
def index():
    page = request.args.get('page')
    amount = request.args.get('amount')
    page = int(page) if page != None else 1
    amount = int(amount) if amount != None else 6
    phones = Phone.query.all();
    id_list = [phone.id for phone in phones]
    offset = ((page - 1) * amount);
    phones = Phone.query.offset(offset).limit(amount).all();
    phones = [phone.as_dict() for phone in phones];
    total = Phone.query.count();
    pages_max = math.ceil(total / amount);
    return jsonify({
        'page_max': pages_max,
        'phones': phones,
        'total': total,
        'list': id_list
    });


@phone_router.route('/', methods=['POST'])
def create():
    req = request.get_json(force=True)
    new_phone = Phone(
        req['number'],
        req['contact']
    )
    db.session.add(new_phone)
    db.session.commit()
    return jsonify({})


@phone_router.route('/', methods=['PUT'])
def edit():
    req = request.get_json(force=True)
    phone = Phone.query.get(req['id'])
    phone.number = req['number']
    phone.contact = req['contact']
    db.session.commit()
    return jsonify({})


@phone_router.route('/<int:phone_id>', methods=['DELETE'])
def delete(phone_id):
    phone = Phone.query.get(phone_id)
    db.session.delete(phone)
    db.session.commit()
    return jsonify({})
