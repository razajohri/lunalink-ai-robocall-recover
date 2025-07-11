
import React, { useState, useEffect } from 'react';
import { Phone, BarChart, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/dashboard/StatCard';
import CallPerformanceChart from '@/components/dashboard/CallPerformanceChart';
import RecentCallsTable from '@/components/dashboard/RecentCallsTable';
import { useVapi } from '@/contexts/VapiContext';
import VapiConfig from '@/components/vapi/VapiConfig';
import { toast } from '@/components/ui/use-toast';
import { VapiStats } from '@/services/vapiService';

const Dashboard = () => {
  const { vapiService, assistantId, isConfigured } = useVapi();
  const [stats, setStats] = useState<VapiStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    if (!vapiService || !assistantId) {
      console.log('VapiService or assistantId not available');
      return;
    }
    
    setIsLoading(true);
    console.log('Starting to fetch stats...');
    
    try {
      const statsData = await vapiService.getStats(assistantId);
      console.log('Stats fetched successfully:', statsData);
      setStats(statsData);
      setLastUpdated(new Date());
      
      toast({
        title: "Data Updated",
        description: `Loaded ${statsData.totalCalls} calls successfully`,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics. Please check your API credentials.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConfigured) {
      console.log('Dashboard configured, fetching stats...');
      fetchStats();
    }
  }, [isConfigured, vapiService, assistantId]);

  if (!isConfigured) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <VapiConfig />
      </div>
    );
  }

  if (isLoading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard data...</p>
          <p className="text-sm text-muted-foreground mt-2">This may take a moment...</p>
        </div>
      </div>
    );
  }

  const todayCalls = stats?.totalCalls || 0;
  const successRate = stats?.successRate || 0;
  const totalCost = stats?.totalCost || 0;
  const avgDuration = stats?.averageDuration || 0;
  const avgCost = stats?.averageCost || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your AI Voice Assistant performance</p>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button onClick={fetchStats} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Calls" 
          value={todayCalls.toString()} 
          icon={<Phone size={24} />}
          change={`${todayCalls} calls total`}
          changeType="neutral"
        />
        <StatCard 
          title="Success Rate" 
          value={`${successRate.toFixed(1)}%`} 
          icon={<BarChart size={24} />}
          change={`Based on ${todayCalls} calls`}
          changeType={successRate > 50 ? "increase" : "decrease"}
        />
        <StatCard 
          title="Total Cost" 
          value={vapiService?.formatCurrency(totalCost) || '$0.00'} 
          icon={<DollarSign size={24} />}
          change={`Avg: ${vapiService?.formatCurrency(avgCost) || '$0.00'} per call`}
          changeType="neutral"
        />
        <StatCard 
          title="Avg. Call Duration" 
          value={vapiService?.formatDuration(avgDuration) || '0:00'} 
          icon={<Clock size={24} />}
          change={`${Math.round(avgDuration)}s average`}
          changeType="neutral"
        />
      </div>
      
      <CallPerformanceChart />
      
      <RecentCallsTable />
    </div>
  );
};

export default Dashboard;
