
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare } from 'lucide-react';
import AgentCard from '@/components/voice-agents/AgentCard';
import CreateAgentModal from '@/components/voice-agents/CreateAgentModal';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    },
    {
      id: '3',
      name: 'Order Cancellation',
      type: 'order-cancellation',
      voice: 'Male Voice',
      trigger: 'Triggers upon cancellation request',
      callCount: 12,
      active: true,
    },
    {
      id: '4',
      name: 'Order Confirmation',
      type: 'order-confirmation',
      voice: 'Female Voice',
      trigger: 'Triggers after order placement',
      callCount: 87,
      active: true,
    },
    {
      id: '5',
      name: 'Product Recommendation',
      type: 'product-recommendation',
      voice: 'Male Voice',
      trigger: 'Triggers for repeat customers',
      callCount: 35,
      active: false,
    },
    {
      id: '6',
      name: 'Customer Service',
      type: 'inbound-service',
      voice: 'Female Voice',
      trigger: 'Handles inbound service calls',
      callCount: 56,
      active: true,
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
      
      <Tabs defaultValue="voice" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="voice">Voice Agents</TabsTrigger>
          <TabsTrigger value="messaging">SMS Messaging</TabsTrigger>
        </TabsList>
        
        <TabsContent value="voice" className="mt-4">
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
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">No Voice Agents Yet</h3>
                <p className="text-muted-foreground mb-4">Create your first voice agent to start recovering abandoned carts</p>
                <CreateAgentModal onCreateAgent={handleCreateAgent}>
                  <Button>Create Your First Agent</Button>
                </CreateAgentModal>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="messaging" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Twilio SMS Integration</CardTitle>
              <CardDescription>Send SMS messages for abandoned carts and order updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-4 border rounded-lg bg-primary/5">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mr-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Abandoned Cart SMS</h3>
                  <p className="text-muted-foreground">Automatically send discount codes to customers who abandoned their carts</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center p-4 border rounded-lg bg-primary/5">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mr-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Order Updates SMS</h3>
                  <p className="text-muted-foreground">Send order confirmation, shipping updates, and delivery notifications</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Connect Your Twilio Account</h3>
                <p className="text-muted-foreground mb-4">Link your Twilio account to start sending SMS messages</p>
                <Button>Connect Twilio</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VoiceAgents;
