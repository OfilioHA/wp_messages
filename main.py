import os
from flask import Flask, render_template, jsonify;
from instance.models import db;
from app.controllers import api

basedir = os.path.abspath(os.path.dirname(__file__)) + '/instance/database.db';
app = Flask(__name__);
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + basedir;
db.init_app(app);
app.register_blueprint(api);

@app.route('/')
def index():
    return render_template('index.html', name="Ofilio");

@app.route('/about')
def about():
    return jsonify({
        'caca': 'tpro'
    });

if __name__ == '__main__':
    with app.app_context():
        from instance.models.Phone import Phone
        db.create_all();    
        app.run(
            host='0.0.0.0',
            debug=True
        )