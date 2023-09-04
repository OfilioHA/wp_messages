import os
from flask import Flask, render_template
from instance.models import db
from controllers import api

basedir = os.path.abspath(os.path.dirname(__file__));
database = os.path.join(basedir, 'instance/database.db');

app = Flask(__name__);
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + database;
app.config['UPLOAD_FOLDER'] = '/upload'
db.app = app;
db.init_app(app);
app.register_blueprint(api);

@app.route('/')
def index():
    return render_template('index.html');

if __name__ == '__main__':
    with app.app_context():
        db.create_all();    
        app.run(
            host='0.0.0.0',
            debug=True
        )
