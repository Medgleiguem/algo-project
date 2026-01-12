from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import time

app = Flask(__name__)
CORS(app)

import sys
import os

# Add current directory to path for Vercel
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import modules
from models.queue import Queue
from models.stack import Stack
from models.package import Package
from algorithms.sorting import SortingAlgorithms

# Initialize data structures
package_queue = Queue()
truck_stack = Stack()
next_id = 1
performance_history = []

@app.route('/api/packages', methods=['POST'])
def add_package():
    """Add a new package to the queue"""
    global next_id
    try:
        data = request.json
        custom_id = data.get('id')
        
        if custom_id is not None:
            # Check for uniqueness
            custom_id = int(custom_id)
            
            # Check queue
            for p in package_queue.items:
                if p.id == custom_id:
                    return jsonify({'success': False, 'error': f'Package with ID {custom_id} already exists in queue'}), 400
            
            # Check stack
            for p in truck_stack.items:
                if p.id == custom_id:
                    return jsonify({'success': False, 'error': f'Package with ID {custom_id} already exists in stack'}), 400
            
            package_id = custom_id
            if package_id >= next_id:
                next_id = package_id + 1
        else:
            package_id = next_id
            next_id += 1
            
        package = Package(
            id=package_id,
            priority=data.get('priority'),
            weight=data.get('weight'),
            destination=data.get('destination'),
            arrival_order=package_queue.size() + 1
        )
        
        package_queue.enqueue(package)
        return jsonify({
            'success': True,
            'package': package.to_dict(),
            'queue': package_queue.to_list()
        }), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/packages/random', methods=['POST'])
def add_random_package():
    """Generate and add a random package"""
    global next_id
    try:
        count = request.json.get('count', 1)
        packages = []
        for _ in range(count):
            package = Package.generate_random(next_id, package_queue.size() + 1)
            next_id += 1
            package_queue.enqueue(package)
            packages.append(package.to_dict())
        
        return jsonify({
            'success': True,
            'packages': packages,
            'queue': package_queue.to_list()
        }), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/queue', methods=['GET'])
def get_queue():
    """Get all packages in queue"""
    return jsonify({
        'success': True,
        'queue': package_queue.to_list(),
        'size': package_queue.size()
    })

@app.route('/api/queue/process', methods=['POST'])
def process_package():
    """Move package from queue to stack"""
    try:
        if package_queue.is_empty():
            return jsonify({'success': False, 'error': 'Queue is empty'}), 400
        
        package = package_queue.dequeue()
        truck_stack.push(package)
        
        return jsonify({
            'success': True,
            'package': package.to_dict(),
            'queue': package_queue.to_list(),
            'stack': truck_stack.to_list()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/stack', methods=['GET'])
def get_stack():
    """Get all packages in stack"""
    return jsonify({
        'success': True,
        'stack': truck_stack.to_list(),
        'size': truck_stack.size()
    })

@app.route('/api/stack/unload', methods=['POST'])
def unload_package():
    """Unload package from stack"""
    try:
        if truck_stack.is_empty():
            return jsonify({'success': False, 'error': 'Stack is empty'}), 400
        
        package = truck_stack.pop()
        
        return jsonify({
            'success': True,
            'package': package.to_dict(),
            'stack': truck_stack.to_list()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/queue/sort', methods=['POST'])
def sort_queue():
    """Sort queue by priority"""
    try:
        algorithm = request.json.get('algorithm', 'quick')
        key = request.json.get('key', 'priority')
        
        packages = package_queue.get_all()
        sorter = SortingAlgorithms()
        result = sorter.sort(packages, key, algorithm, ascending=False)
        
        package_queue.clear()
        for pkg in result['sorted']:
            package_queue.enqueue(pkg)
        
        performance_history.append(result['metrics'])
        
        return jsonify({
            'success': True,
            'queue': package_queue.to_list(),
            'metrics': result['metrics']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/queue/clear', methods=['POST'])
def clear_queue():
    """Clear all packages from the queue"""
    try:
        package_queue.clear()
        return jsonify({
            'success': True,
            'message': 'Queue cleared successfully',
            'queue': package_queue.to_list()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/stack/sort', methods=['POST'])
def sort_stack():
    """Sort stack by weight"""
    try:
        algorithm = request.json.get('algorithm', 'quick')
        key = request.json.get('key', 'weight')
        
        packages = truck_stack.get_all()
        sorter = SortingAlgorithms()
        result = sorter.sort(packages, key, algorithm, ascending=True)
        
        truck_stack.clear()
        for pkg in result['sorted']:
            truck_stack.push(pkg)
        
        performance_history.append(result['metrics'])
        
        return jsonify({
            'success': True,
            'stack': truck_stack.to_list(),
            'metrics': result['metrics']
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/compare', methods=['POST'])
def compare_algorithms():
    """Compare all sorting algorithms"""
    try:
        packages = package_queue.get_all()
        if not packages:
            return jsonify({'success': False, 'error': 'Queue is empty'}), 400
        
        algorithms = ['bubble', 'quick', 'merge', 'insertion']
        results = []
        
        sorter = SortingAlgorithms()
        for algo in algorithms:
            result = sorter.sort(packages.copy(), 'priority', algo, ascending=False)
            results.append(result['metrics'])
        
        return jsonify({
            'success': True,
            'results': results
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/performance', methods=['GET'])
def get_performance():
    """Get performance history"""
    return jsonify({
        'success': True,
        'history': performance_history
    })

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get system statistics"""
    return jsonify({
        'success': True,
        'stats': {
            'queue_size': package_queue.size(),
            'stack_size': truck_stack.size(),
            'total_processed': next_id - 1,
            'sorts_performed': len(performance_history)
        }
    })

@app.route('/api/reset', methods=['POST'])
def reset_system():
    """Reset the entire system"""
    global next_id, performance_history
    package_queue.clear()
    truck_stack.clear()
    next_id = 1
    performance_history = []
    
    return jsonify({'success': True, 'message': 'System reset successfully'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
