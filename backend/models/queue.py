class Queue:
    """FIFO Queue implementation"""
    
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        """Add item to the end of queue"""
        self.items.append(item)
    
    def dequeue(self):
        """Remove and return item from front of queue"""
        if self.is_empty():
            raise Exception("Queue is empty")
        return self.items.pop(0)
    
    def peek(self):
        """Return front item without removing"""
        if self.is_empty():
            raise Exception("Queue is empty")
        return self.items[0]
    
    def is_empty(self):
        """Check if queue is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of items in queue"""
        return len(self.items)
    
    def clear(self):
        """Clear all items from queue"""
        self.items = []
    
    def get_all(self):
        """Get all items as list"""
        return self.items.copy()
    
    def to_list(self):
        """Convert all items to dictionaries"""
        return [item.to_dict() for item in self.items]
    
    def __repr__(self):
        return f"Queue(size={self.size()})"
