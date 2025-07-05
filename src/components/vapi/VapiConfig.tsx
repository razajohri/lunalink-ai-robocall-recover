
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { useVapi } from '@/contexts/VapiContext';
import { toast } from '@/components/ui/use-toast';

const VapiConfig = () => {
  const { setCredentials, apiKey: currentApiKey, assistantId: currentAssistantId } = useVapi();
  const [apiKey, setApiKey] = useState(currentApiKey || '38d075b8-205d-4b78-bd4c-e794ee1d95d9');
  const [assistantId, setAssistantId] = useState(currentAssistantId || '98f23ff7-ea2e-46ac-b907-c0a04cb1bc20');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!apiKey.trim() || !assistantId.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both API key and Assistant ID",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      setCredentials(apiKey.trim(), assistantId.trim());
      toast({
        title: "Configuration Saved",
        description: "Vapi credentials have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Vapi Configuration</CardTitle>
        <CardDescription>
          Enter your Vapi API credentials to connect your voice assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Use your <strong>private API key</strong> for dashboard operations (fetching calls, stats, etc.)
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <Label htmlFor="apiKey">Private API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Vapi private API key"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="assistantId">Assistant ID</Label>
          <Input
            id="assistantId"
            value={assistantId}
            onChange={(e) => setAssistantId(e.target.value)}
            placeholder="Enter your Assistant ID"
          />
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Saving...' : 'Save Configuration'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VapiConfig;
