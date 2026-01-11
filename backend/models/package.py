import random
from datetime import datetime

class Package:
    """Represents a package in the system"""
    
    DESTINATIONS = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 
                    'Nantes', 'Bordeaux', 'Strasbourg', 'Lille', 'Rennes']
    
    def __init__(self, id, priority, weight, destination, arrival_order):
        self.id = id
        self.priority = priority
        self.weight = weight
        self.destination = destination
        self.arrival_order = arrival_order
        self.timestamp = datetime.now().isoformat()
    
    @classmethod
    def generate_random(cls, id, arrival_order):
        """Generate a random package"""
        return cls(
            id=id,
            priority=random.randint(1, 5),
            weight=round(random.uniform(1.0, 50.0), 2),
            destination=random.choice(cls.DESTINATIONS),
            arrival_order=arrival_order
        )
    
    def to_dict(self):
        """Convert package to dictionary"""
        return {
            'id': self.id,
            'priority': self.priority,
            'weight': self.weight,
            'destination': self.destination,
            'arrival_order': self.arrival_order,
            'timestamp': self.timestamp
        }
    
    def __repr__(self):
        return f"Package(id={self.id}, priority={self.priority}, weight={self.weight}kg)"
