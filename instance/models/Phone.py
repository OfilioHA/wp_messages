from instance.models import db;


class Phone(db.Model):

    def __init__(self, number, contact):
        self.number = number;
        self.contact = contact

    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String, unique=True, nullable=False)
    contact = db.Column(db.String)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}