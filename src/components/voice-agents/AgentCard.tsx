
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AgentCardProps {
  id: string;
  name: string;
  type: string;
  voice: string;
  trigger: string;
  callCount: number;
  active: boolean;
  phoneNumber?: string;
  onEdit: (id: string) => void;
  onActivate: (id: string) => void;
  onTestCall: (id: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({
  id,
  name,
  type,
  voice,
  trigger,
  callCount,
  active,
  phoneNumber = "Not specified",
  onEdit,
  onActivate,
  onTestCall
}) => {
  return (
    <Card className={active ? "border-luna-purple/30" : ""}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">{name}</h3>
              <Badge variant={active ? "default" : "outline"}>
                {active ? "Active" : "Inactive"}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="flex items-center">
                <span className="w-24">Voice:</span> 
                {voice}
              </p>
              <p className="flex items-center">
                <span className="w-24">Triggers:</span> 
                {trigger}
              </p>
              <p className="flex items-center">
                <span className="w-24">Phone:</span> 
                {phoneNumber}
              </p>
              <p className="flex items-center">
                <span className="w-24">Calls made:</span> 
                {callCount}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => onTestCall(id)}>
            Test Call
          </Button>
          <Button 
            size="sm"
            onClick={() => onActivate(id)}
            variant={active ? "outline" : "default"}
          >
            {active ? "Deactivate" : "Activate"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
