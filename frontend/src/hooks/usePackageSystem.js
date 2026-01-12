import { useState, useEffect, useCallback } from 'react';
import { ApiService } from '../services/api.service';

export const usePackageSystem = () => {
  const [queue, setQueue] = useState([]);
  const [stack, setStack] = useState([]);
  const [stats, setStats] = useState({ 
    queue_size: 0, 
    stack_size: 0, 
    total_processed: 0, 
    sorts_performed: 0 
  });
  const [performanceData, setPerformanceData] = useState([]);
  const [sortMetrics, setSortMetrics] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [queueRes, stackRes, statsRes] = await Promise.all([
        ApiService.getQueue(),
        ApiService.getStack(),
        ApiService.getStats()
      ]);
      
      if (queueRes.success) setQueue(queueRes.queue);
      if (stackRes.success) setStack(stackRes.stack);
      if (statsRes.success) setStats(statsRes.stats);
    } catch (error) {
      showNotification('Failed to load data. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAction = async (action, param) => {
    try {
      setLoading(true);
      let result;
      
      switch (action) {
        case 'addOne':
          result = await ApiService.addRandomPackages(1);
          showNotification('Package added to queue');
          break;
        case 'add10':
          result = await ApiService.addRandomPackages(10);
          showNotification('10 packages added to queue');
          break;
        case 'add50':
          result = await ApiService.addRandomPackages(50);
          showNotification('50 packages added to queue');
          break;
        case 'addManual':
          result = await ApiService.addPackage(param);
          showNotification(`Package #${result.package?.id} added manually`);
          break;
        case 'process':
          result = await ApiService.processPackage();
          showNotification(`Package #${result.package?.id} loaded onto truck`);
          break;
        case 'unload':
          result = await ApiService.unloadPackage();
          showNotification(`Package #${result.package?.id} unloaded from truck`);
          break;
        case 'clearQueue':
          await ApiService.clearQueue();
          showNotification('Queue cleared successfully');
          break;
        case 'sortQueue':
          // param is expected to be { algorithm, key }
          result = await ApiService.sortQueue(param.algorithm, param.key);
          setSortMetrics(result.metrics);
          showNotification(`Queue sorted by ${param.key} using ${result.metrics?.algorithm}`);
          break;
        case 'sortStack':
          // param is expected to be { algorithm, key }
          result = await ApiService.sortStack(param.algorithm, param.key);
          setSortMetrics(result.metrics);
          showNotification(`Stack sorted by ${param.key} using ${result.metrics?.algorithm}`);
          break;
        case 'compare':
          result = await ApiService.compareAlgorithms();
          if (result.success) {
            setPerformanceData(result.results);
            showNotification('Algorithm comparison complete');
            return 'analytics'; // Signal to switch to analytics tab
          }
          break;
        case 'reset':
          await ApiService.resetSystem();
          setPerformanceData([]);
          setSortMetrics(null);
          showNotification('System reset successfully');
          break;
        default:
          // Add default case to handle unknown actions
          showNotification('Unknown action', 'error');
          break;
      }
      
      await loadData();
    } catch (error) {
      showNotification(error.message || 'Operation failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    queue,
    stack,
    stats,
    performanceData,
    sortMetrics,
    notification,
    loading,
    showNotification,
    setNotification,
    handleAction
  };
};