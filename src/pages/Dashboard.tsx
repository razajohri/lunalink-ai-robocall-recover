
import React, { useState } from 'react';
import { Phone, BarChart, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/dashboard/StatCard';
import CallPerformanceChart from '@/components/dashboard/CallPerformanceChart';
import RecentCallsTable from '@/components/dashboard/RecentCallsTable';
import AgentStatus from '@/components/voice-agents/AgentStatus';
import CreateAgentModal from '@/components/voice-agents/CreateAgentModal';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [agentActive, setAgentActive] = useState(true);
  
  const handleToggleAgent = () => {
    setAgentActive(!agentActive);
    toast({
      title: agentActive ? "Voice Agent Deactivated" : "Voice Agent Activated",
      description: agentActive 
        ? "Your voice agent will no longer make calls" 
        : "Your voice agent will now start making calls to abandoned cart customers",
      duration: 3000,
    });
  };
  
  const handleCreateAgent = (agentData: any) => {
    console.log('Agent created:', agentData);
    toast({
      title: "Voice Agent Created",
      description: `${agentData.name} has been created successfully`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your AI Voice Agent performance</p>
        </div>
        <CreateAgentModal onCreateAgent={handleCreateAgent} />
      </div>
      
      <AgentStatus active={agentActive} onToggle={handleToggleAgent} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Calls Today" 
          value="143" 
          icon={<Phone size={24} />}
          change="+12% from last week"
          changeType="increase"
        />
        <StatCard 
          title="Success Rate" 
          value="78%" 
          icon={<BarChart size={24} />}
          change="+5% from last week"
          changeType="increase"
        />
        <StatCard 
          title="Revenue Recovered" 
          value="$1,890" 
          icon={<DollarSign size={24} />}
          change="+23% from last week"
          changeType="increase"
        />
        <StatCard 
          title="Avg. Call Duration" 
          value="1:42" 
          icon={<Clock size={24} />}
          change="-8% from last week"
          changeType="decrease"
        />
      </div>
      
      <CallPerformanceChart />
      
      <RecentCallsTable />
    </div>
  );
};

export default Dashboard;
