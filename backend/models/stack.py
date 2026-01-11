class Stack:
    """LIFO Stack implementation"""
    
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add item to top of stack"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return item from top of stack"""
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.items.pop()
    
    def peek(self):
        """Return top item without removing"""
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.items[-1]
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of items in stack"""
        return len(self.items)
    
    def clear(self):
        """Clear all items from stack"""
        self.items = []
    
    def get_all(self):
        """Get all items as list"""
        return self.items.copy()
    
    def to_list(self):
        """Convert all items to dictionaries (top to bottom)"""
        return [item.to_dict() for item in reversed(self.items)]
    
    def __repr__(self):
        return f"Stack(size={self.size()})"