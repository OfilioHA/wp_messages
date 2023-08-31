from flask import Flask, render_template;
from instance.models import db;

app = Flask(__name__);
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db.init_app(app);

@app.route('/')
def index():
    return render_template('index.html', name="Ofilio");

if __name__ == '__main__':
    with app.app_context():
        db.create_all();
        app.run(
            host='0.0.0.0',
            debug=True
        )