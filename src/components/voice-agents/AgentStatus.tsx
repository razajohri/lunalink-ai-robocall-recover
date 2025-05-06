
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AgentStatusProps {
  active: boolean;
  onToggle: () => void;
}

const AgentStatus: React.FC<AgentStatusProps> = ({ active, onToggle }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Voice Agent Status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {active 
                ? "Your AI voice agent is currently calling abandoned cart customers" 
                : "Your AI voice agent is currently inactive"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="agent-active" className={active ? "text-luna-success" : "text-gray-400"}>
              {active ? "Active" : "Inactive"}
            </Label>
            <Switch
              id="agent-active"
              checked={active}
              onCheckedChange={onToggle}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentStatus;
