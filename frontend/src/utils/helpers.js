export const getPriorityColor = (priority) => {
  const colors = {
    5: 'bg-red-500',
    4: 'bg-orange-500',
    3: 'bg-yellow-500',
    2: 'bg-blue-500',
    1: 'bg-green-500'
  };
  return colors[priority] || 'bg-gray-500';
};

export const formatTime = (ms) => {
  return `${ms.toFixed(3)} ms`;
};

export const getAlgorithmInfo = () => [
  { 
    name: 'Bubble Sort', 
    color: 'purple-400', 
    time: 'O(n²)', 
    space: 'O(1)', 
    stable: true, 
    desc: 'Simple but inefficient for large datasets. Good for educational purposes.' 
  },
  { 
    name: 'Quick Sort', 
    color: 'blue-400', 
    time: 'O(n log n)', 
    space: 'O(log n)', 
    stable: false, 
    desc: 'Fast in practice. Widely used general-purpose sorting algorithm.' 
  },
  { 
    name: 'Merge Sort', 
    color: 'green-400', 
    time: 'O(n log n)', 
    space: 'O(n)', 
    stable: true, 
    desc: 'Consistent performance. Excellent for linked lists and external sorting.' 
  },
  { 
    name: 'Insertion Sort', 
    color: 'yellow-400', 
    time: 'O(n²)', 
    space: 'O(1)', 
    stable: true, 
    desc: 'Efficient for small datasets and nearly sorted data.' 
  }
];