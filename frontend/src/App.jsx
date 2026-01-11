import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Truck, TrendingUp } from 'lucide-react';

// Import components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { TabNavigation } from './components/layout/TabNavigation';
import { Notification } from './components/common/Notification';
import { StatsCard } from './components/common/StatsCard';
import { ControlPanel } from './components/operations/ControlPanel';
import { QueueDisplay } from './components/operations/QueueDisplay';
import { StackDisplay } from './components/operations/StackDisplay';
import { Analytics } from './components/analytics/Analytics';

// Import custom hook
import { usePackageSystem } from './hooks/usePackageSystem';

const App = () => {
  const [activeTab, setActiveTab] = useState('operations');
  
  const {
    queue,
    stack,
    stats,
    performanceData,
    sortMetrics,
    notification,
    // Remove unused 'loading' variable
    setNotification,
    handleAction
  } = usePackageSystem();

  const onAction = async (action, param) => {
    const result = await handleAction(action, param);
    if (result === 'analytics') {
      setActiveTab('analytics');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Header />

        {/* Notification */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Queue Size" 
            value={stats.queue_size} 
            icon={ArrowDown} 
            color="text-purple-400" 
          />
          <StatsCard 
            title="Stack Size" 
            value={stats.stack_size} 
            icon={ArrowUp} 
            color="text-blue-400" 
          />
          <StatsCard 
            title="Total Processed" 
            value={stats.total_processed} 
            icon={Truck} 
            color="text-green-400" 
          />
          <StatsCard 
            title="Sorts Performed" 
            value={stats.sorts_performed} 
            icon={TrendingUp} 
            color="text-yellow-400" 
          />
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        {activeTab === 'operations' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ControlPanel 
              onAction={onAction} 
              sortMetrics={sortMetrics} 
            />
            <div className="space-y-6">
              <QueueDisplay queue={queue} />
              <StackDisplay stack={stack} />
            </div>
          </div>
        ) : (
          <Analytics performanceData={performanceData} />
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;