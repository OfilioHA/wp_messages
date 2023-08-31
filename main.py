from flask import Flask;
from flask_sqlalchemy import SQLAlchemy;

db = SQLAlchemy();

app = Flask(__name__);
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db.init_app(app);

@app.route('/')
def index():
    return 'Hello World';

if __name__ == '__main__':
    with app.app_context():
        db.create_all();
        app.run(
            host='0.0.0.0',
            debug=True
        )