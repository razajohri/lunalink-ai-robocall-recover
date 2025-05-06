
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AgentCard from '@/components/voice-agents/AgentCard';
import CreateAgentModal from '@/components/voice-agents/CreateAgentModal';
import { toast } from '@/components/ui/use-toast';

const VoiceAgents = () => {
  const [agents, setAgents] = useState([
    {
      id: '1',
      name: 'Cart Recovery Agent',
      type: 'abandoned-cart',
      voice: 'Female Voice',
      trigger: 'Triggers after 15 minutes',
      callCount: 143,
      active: true,
    },
    {
      id: '2',
      name: 'Order Follow-up',
      type: 'order-follow-up',
      voice: 'Female Voice',
      trigger: 'Triggers after order delivery',
      callCount: 0,
      active: false,
    }
  ]);
  
  const handleEditAgent = (id: string) => {
    console.log('Edit agent:', id);
    toast({
      title: "Edit Agent",
      description: "Opening agent editor",
      duration: 3000,
    });
  };
  
  const handleActivateAgent = (id: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? {...agent, active: !agent.active} : agent
    ));
    
    const agent = agents.find(a => a.id === id);
    if (agent) {
      toast({
        title: agent.active ? "Agent Deactivated" : "Agent Activated",
        description: `${agent.name} has been ${agent.active ? 'deactivated' : 'activated'} successfully`,
        duration: 3000,
      });
    }
  };
  
  const handleTestCall = (id: string) => {
    console.log('Test call for agent:', id);
    toast({
      title: "Test Call Initiated",
      description: "A test call has been started. Check call logs for results.",
      duration: 3000,
    });
  };
  
  const handleCreateAgent = (agentData: any) => {
    const newAgent = {
      id: `${agents.length + 1}`,
      name: agentData.name,
      type: agentData.triggerType,
      voice: `${agentData.voiceType.charAt(0).toUpperCase() + agentData.voiceType.slice(1)} Voice`,
      trigger: `Triggers ${agentData.triggerType === 'abandoned-cart' ? 'after' : 'upon'} ${agentData.triggerDelay} minutes`,
      callCount: 0,
      active: false,
    };
    
    setAgents(prev => [...prev, newAgent]);
    
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
          <h1 className="text-2xl font-bold">Voice Agents</h1>
          <p className="text-muted-foreground">Manage and configure your AI voice agents</p>
        </div>
        <CreateAgentModal onCreateAgent={handleCreateAgent} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map(agent => (
          <AgentCard 
            key={agent.id}
            id={agent.id}
            name={agent.name}
            type={agent.type}
            voice={agent.voice}
            trigger={agent.trigger}
            callCount={agent.callCount}
            active={agent.active}
            onEdit={handleEditAgent}
            onActivate={handleActivateAgent}
            onTestCall={handleTestCall}
          />
        ))}
        
        {agents.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 border border-dashed rounded-lg">
            <div className="rounded-full bg-luna-purple/10 w-16 h-16 flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-luna-purple" />
            </div>
            <h3 className="text-lg font-medium">No Voice Agents Yet</h3>
            <p className="text-muted-foreground mb-4">Create your first voice agent to start recovering abandoned carts</p>
            <CreateAgentModal onCreateAgent={handleCreateAgent}>
              <Button>Create Your First Agent</Button>
            </CreateAgentModal>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAgents;
