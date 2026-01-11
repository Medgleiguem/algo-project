import time

class SortingAlgorithms:
    """Implementation of various sorting algorithms"""
    
    def __init__(self):
        self.comparisons = 0
        self.swaps = 0
    
    def _reset_counters(self):
        """Reset comparison and swap counters"""
        self.comparisons = 0
        self.swaps = 0
    
    def bubble_sort(self, arr, key, ascending=True):
        """Bubble Sort - O(n²) time complexity"""
        n = len(arr)
        for i in range(n - 1):
            for j in range(n - i - 1):
                self.comparisons += 1
                compare = (getattr(arr[j], key) > getattr(arr[j + 1], key)) if ascending else \
                         (getattr(arr[j], key) < getattr(arr[j + 1], key))
                
                if compare:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    self.swaps += 1
        return arr
    
    def quick_sort(self, arr, key, ascending=True):
        """Quick Sort - O(n log n) average time complexity"""
        if len(arr) <= 1:
            return arr
        
        def partition(arr, low, high):
            pivot = getattr(arr[high], key)
            i = low - 1
            
            for j in range(low, high):
                self.comparisons += 1
                compare = (getattr(arr[j], key) <= pivot) if ascending else \
                         (getattr(arr[j], key) >= pivot)
                
                if compare:
                    i += 1
                    arr[i], arr[j] = arr[j], arr[i]
                    self.swaps += 1
            
            arr[i + 1], arr[high] = arr[high], arr[i + 1]
            self.swaps += 1
            return i + 1
        
        def quick_sort_recursive(arr, low, high):
            if low < high:
                pi = partition(arr, low, high)
                quick_sort_recursive(arr, low, pi - 1)
                quick_sort_recursive(arr, pi + 1, high)
        
        quick_sort_recursive(arr, 0, len(arr) - 1)
        return arr
    
    def merge_sort(self, arr, key, ascending=True):
        """Merge Sort - O(n log n) time complexity"""
        if len(arr) <= 1:
            return arr
        
        def merge(left, right):
            result = []
            i = j = 0
            
            while i < len(left) and j < len(right):
                self.comparisons += 1
                compare = (getattr(left[i], key) <= getattr(right[j], key)) if ascending else \
                         (getattr(left[i], key) >= getattr(right[j], key))
                
                if compare:
                    result.append(left[i])
                    i += 1
                else:
                    result.append(right[j])
                    j += 1
                self.swaps += 1
            
            result.extend(left[i:])
            result.extend(right[j:])
            return result
        
        mid = len(arr) // 2
        left = self.merge_sort(arr[:mid], key, ascending)
        right = self.merge_sort(arr[mid:], key, ascending)
        
        return merge(left, right)
    
    def insertion_sort(self, arr, key, ascending=True):
        """Insertion Sort - O(n²) time complexity"""
        for i in range(1, len(arr)):
            current = arr[i]
            j = i - 1
            
            while j >= 0:
                self.comparisons += 1
                compare = (getattr(arr[j], key) > getattr(current, key)) if ascending else \
                         (getattr(arr[j], key) < getattr(current, key))
                
                if compare:
                    arr[j + 1] = arr[j]
                    self.swaps += 1
                    j -= 1
                else:
                    break
            
            arr[j + 1] = current
        
        return arr
    
    def sort(self, packages, key, algorithm='quick', ascending=True):
        """
        Sort packages using specified algorithm
        
        Args:
            packages: List of Package objects
            key: Attribute to sort by ('priority' or 'weight')
            algorithm: 'bubble', 'quick', 'merge', or 'insertion'
            ascending: Sort order
        
        Returns:
            Dictionary with sorted packages and metrics
        """
        self._reset_counters()
        
        # Make a copy to avoid modifying original
        arr = packages.copy()
        
        start_time = time.perf_counter()
        
        if algorithm == 'bubble':
            sorted_arr = self.bubble_sort(arr, key, ascending)
            algo_name = 'Bubble Sort'
        elif algorithm == 'quick':
            sorted_arr = self.quick_sort(arr, key, ascending)
            algo_name = 'Quick Sort'
        elif algorithm == 'merge':
            sorted_arr = self.merge_sort(arr, key, ascending)
            algo_name = 'Merge Sort'
        elif algorithm == 'insertion':
            sorted_arr = self.insertion_sort(arr, key, ascending)
            algo_name = 'Insertion Sort'
        else:
            raise ValueError(f"Unknown algorithm: {algorithm}")
        
        end_time = time.perf_counter()
        execution_time = (end_time - start_time) * 1000  # Convert to milliseconds
        
        return {
            'sorted': sorted_arr,
            'metrics': {
                'algorithm': algo_name,
                'time': round(execution_time, 3),
                'comparisons': self.comparisons,
                'swaps': self.swaps,
                'complexity': self._get_complexity(algorithm)
            }
        }
    
    def _get_complexity(self, algorithm):
        """Get time complexity for algorithm"""
        complexities = {
            'bubble': 'O(n²)',
            'quick': 'O(n log n)',
            'merge': 'O(n log n)',
            'insertion': 'O(n²)'
        }
        return complexities.get(algorithm, 'Unknown')