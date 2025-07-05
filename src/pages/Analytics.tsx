
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useVapi } from '@/contexts/VapiContext';
import { VapiCall } from '@/services/vapiService';
import VapiConfig from '@/components/vapi/VapiConfig';

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#6366f1'];

const Analytics = () => {
  const { vapiService, assistantId, isConfigured } = useVapi();
  const [calls, setCalls] = useState<VapiCall[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCalls = async () => {
    if (!vapiService || !assistantId) return;
    
    setIsLoading(true);
    try {
      const callsData = await vapiService.getCalls(assistantId, 100);
      setCalls(callsData);
    } catch (error) {
      console.error('Error fetching calls:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConfigured) {
      fetchCalls();
    }
  }, [isConfigured, vapiService, assistantId]);

  // Process data for charts
  const processCallsData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toDateString();
    });

    const dailyData = last7Days.map(dateStr => {
      const dayName = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
      const dayCalls = calls.filter(call => {
        const callDate = new Date(call.startedAt).toDateString();
        return callDate === dateStr;
      });
      
      const successful = dayCalls.filter(call => 
        call.status === 'ended' && 
        (call.analysis?.successEvaluation === 'success' || (call.duration && call.duration > 30))
      );

      return {
        day: dayName,
        calls: dayCalls.length,
        recovered: successful.length
      };
    });

    return dailyData;
  };

  const processResultsData = () => {
    const endedCalls = calls.filter(call => call.status === 'ended');
    const successful = endedCalls.filter(call => 
      call.analysis?.successEvaluation === 'success' || (call.duration && call.duration > 30)
    );
    const noAnswer = calls.filter(call => call.status === 'ended' && (!call.duration || call.duration < 10));
    const inProgress = calls.filter(call => call.status === 'in-progress' || call.status === 'queued');
    const declined = endedCalls.filter(call => call.duration && call.duration >= 10 && call.duration < 30);

    return [
      { name: 'Successful', value: successful.length },
      { name: 'No Answer', value: noAnswer.length },
      { name: 'Declined', value: declined.length },
      { name: 'In Progress', value: inProgress.length },
    ].filter(item => item.value > 0);
  };

  const processHourlyData = () => {
    const hourlyMap = new Map();
    
    calls.forEach(call => {
      const hour = new Date(call.startedAt).getHours();
      const hourStr = hour === 0 ? '12AM' : hour <= 12 ? `${hour}AM` : `${hour - 12}PM`;
      hourlyMap.set(hourStr, (hourlyMap.get(hourStr) || 0) + 1);
    });

    const hours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];
    return hours.map(hour => ({
      hour,
      calls: hourlyMap.get(hour) || 0
    }));
  };

  const calculateMetrics = () => {
    const totalCalls = calls.length;
    const endedCalls = calls.filter(call => call.status === 'ended');
    const successful = endedCalls.filter(call => 
      call.analysis?.successEvaluation === 'success' || (call.duration && call.duration > 30)
    );
    
    const successRate = totalCalls > 0 ? (successful.length / totalCalls * 100) : 0;
    const avgDuration = endedCalls.length > 0 ? 
      endedCalls.reduce((sum, call) => sum + (call.duration || 0), 0) / endedCalls.length : 0;
    const totalCost = calls.reduce((sum, call) => sum + (call.cost || 0), 0);
    const estimatedRevenue = totalCost * 10; // Assume 10x ROI
    const roi = totalCost > 0 ? ((estimatedRevenue - totalCost) / totalCost * 100) : 0;

    return {
      successRate,
      avgOrderValue: estimatedRevenue / Math.max(successful.length, 1),
      answerRate: totalCalls > 0 ? (endedCalls.length / totalCalls * 100) : 0,
      roi
    };
  };

  if (!isConfigured) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Configure Vapi to view analytics</p>
        </div>
        <div className="flex items-center justify-center min-h-[40vh]">
          <VapiConfig />
        </div>
      </div>
    );
  }

  if (isLoading && calls.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Analyze call performance and conversion data</p>
        </div>
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  const callsData = processCallsData();
  const resultsData = processResultsData();
  const hourlyData = processHourlyData();
  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Analyze call performance and conversion data</p>
        </div>
        <button 
          onClick={fetchCalls} 
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>
      
      {calls.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No call data available for analytics</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Calls vs Successful Calls (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={callsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="calls" name="Total Calls" fill="#7c4dff" />
                      <Bar dataKey="recovered" name="Successful Calls" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Call Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resultsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {resultsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Calls by Hour of Day</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calls" name="Calls Made" fill="#4a66e8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="font-medium">{metrics.successRate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.min(metrics.successRate, 100)}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg. Revenue per Successful Call</span>
                    <span className="font-medium">{vapiService?.formatCurrency(metrics.avgOrderValue) || '$--'}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Call Answer Rate</span>
                    <span className="font-medium">{metrics.answerRate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${Math.min(metrics.answerRate, 100)}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">ROI</span>
                    <span className="font-medium">{metrics.roi.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Total Calls</span>
                      <span className="text-sm font-medium">{calls.length}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Total Cost</span>
                      <span className="text-sm font-medium">{vapiService?.formatCurrency(calls.reduce((sum, call) => sum + (call.cost || 0), 0)) || '$0.00'}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Avg. Cost per Call</span>
                      <span className="text-sm font-medium">
                        {calls.length > 0 ? vapiService?.formatCurrency(calls.reduce((sum, call) => sum + (call.cost || 0), 0) / calls.length) || '$0.00' : '$0.00'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Total Duration</span>
                      <span className="text-sm font-medium">
                        {vapiService?.formatDuration(calls.reduce((sum, call) => sum + (call.duration || 0), 0)) || '0:00'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
