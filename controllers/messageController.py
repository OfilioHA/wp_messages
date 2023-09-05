from flask import Blueprint, jsonify, request
from instance.models.Phone import Phone
from werkzeug.utils import secure_filename
import pywhatkit as kit
import os

message_router = Blueprint('message', __name__, url_prefix='/message');

@message_router.route('/', methods=['POST'])
def create():
    image = request.files.get('image');
    content = request.form.get('content');
    phones = request.form.get('selected');
    
    phones = phones.split(',');
    image_saved = '';

    phones = Phone.query.filter(Phone.id.in_(phones));

    if image:
        filename = secure_filename(image.filename);
        current_dir = os.getcwd();
        folder = os.path.join(current_dir, 'upload');
        file = os.path.join(folder, filename);
        image.save(file);
        image_saved = file;

    for phone in phones:
        number = phone.number
        if image_saved != '':
            kit.sendwhats_image(number, image_saved, content, tab_close=True)
        else:
            kit.sendwhatmsg_instantly(number, content, tab_close=True)
            
    if image_saved != '':
        os.remove(image_saved);

    return jsonify({})