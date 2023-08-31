from instance.models import db;

class Phone(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String, unique=True, nullable=False)
    contact = db.Column(db.String, unique=True)