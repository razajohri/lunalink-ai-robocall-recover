
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from 'lucide-react';

interface CreateAgentModalProps {
  children?: React.ReactNode;
  onCreateAgent: (agentData: any) => void;
}

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ children, onCreateAgent }) => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    voiceType: 'female',
    voicePersonality: 'friendly',
    triggerType: 'abandoned-cart',
    triggerDelay: '15',
    message: "Hi there! I noticed you left some items in your cart. Would you like to complete your purchase or do you have any questions I can help with?"
  });

  const steps = [
    {
      title: "Name your agent",
      description: "Give your voice agent a name that identifies its purpose.",
    },
    {
      title: "Choose voice",
      description: "Select the voice characteristics for your AI agent.",
    },
    {
      title: "Set trigger",
      description: "Define when your agent should make calls.",
    },
    {
      title: "Customize message",
      description: "Create the script your agent will use when calling customers.",
    },
    {
      title: "Review",
      description: "Review your agent configuration before saving.",
    }
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onCreateAgent(formData);
    setOpen(false);
    setCurrentStep(0);
    setFormData({
      name: '',
      voiceType: 'female',
      voicePersonality: 'friendly',
      triggerType: 'abandoned-cart',
      triggerDelay: '15',
      message: "Hi there! I noticed you left some items in your cart. Would you like to complete your purchase or do you have any questions I can help with?"
    });
  };

  const getDefaultMessage = (triggerType: string) => {
    switch(triggerType) {
      case 'abandoned-cart':
        return "Hi there! I noticed you left some items in your cart. Would you like to complete your purchase or do you have any questions I can help with?";
      case 'order-follow-up':
        return "Hello! I'm calling about your recent order from our store. We wanted to make sure everything arrived as expected. How satisfied are you with your purchase?";
      case 'order-cancellation':
        return "Hello, I'm calling regarding your recent order cancellation. I'd like to understand if there's anything we could have done better or if you'd like help with finding an alternative product.";
      case 'order-confirmation':
        return "Hello! I'm calling to confirm that your order has been successfully processed and is being prepared for shipping. Would you like me to provide you with your tracking information?";
      case 'product-recommendation':
        return "Hello! Based on your previous purchases, we thought you might be interested in some new products that have just arrived. Would you like me to tell you about them?";
      case 'inbound-service':
        return "Hello and thank you for contacting our customer service. I'm here to assist you with any questions or concerns you may have. How can I help you today?";
      default:
        return "Hello, this is an automated call from our store. How may I assist you today?";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input 
                id="agent-name" 
                placeholder="e.g., Cart Recovery Agent" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Voice Type</Label>
              <RadioGroup 
                value={formData.voiceType}
                onValueChange={(value) => handleChange('voiceType', value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Voice Personality</Label>
              <RadioGroup 
                value={formData.voicePersonality}
                onValueChange={(value) => handleChange('voicePersonality', value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friendly" id="friendly" />
                  <Label htmlFor="friendly">Friendly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional">Professional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="casual" id="casual" />
                  <Label htmlFor="casual">Casual</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Trigger</Label>
              <Select 
                value={formData.triggerType}
                onValueChange={(value) => {
                  handleChange('triggerType', value);
                  handleChange('message', getDefaultMessage(value));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abandoned-cart">Abandoned Cart</SelectItem>
                  <SelectItem value="order-follow-up">Order Follow-up</SelectItem>
                  <SelectItem value="order-cancellation">Order Cancellation</SelectItem>
                  <SelectItem value="order-confirmation">Order Confirmation</SelectItem>
                  <SelectItem value="product-recommendation">Product Recommendation</SelectItem>
                  <SelectItem value="inbound-service">Customer Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="delay">Delay before calling (minutes)</Label>
              <Input 
                id="delay" 
                type="number"
                min="5"
                max="1440"
                value={formData.triggerDelay}
                onChange={(e) => handleChange('triggerDelay', e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                How long to wait after trigger event before calling
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Call Script</Label>
              <Textarea 
                id="message" 
                placeholder="Enter the message your agent will say"
                rows={6}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Your agent will use natural language to make this sound conversational
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <p className="font-medium">Agent Name</p>
              <p className="text-sm">{formData.name}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Voice</p>
              <p className="text-sm">{formData.voiceType} ({formData.voicePersonality})</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Trigger</p>
              <p className="text-sm">
                {formData.triggerType === 'abandoned-cart' ? 'Abandoned Cart' : 
                 formData.triggerType === 'order-follow-up' ? 'Order Follow-up' : 
                 formData.triggerType === 'order-cancellation' ? 'Order Cancellation' : 
                 formData.triggerType === 'order-confirmation' ? 'Order Confirmation' : 
                 formData.triggerType === 'product-recommendation' ? 'Product Recommendation' : 'Customer Service'} 
                (after {formData.triggerDelay} minutes)
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Call Script</p>
              <p className="text-sm">{formData.message}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gap-1">
            <Plus size={16} />
            Create New Agent
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>{steps[currentStep].description}</DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-between mb-4">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 flex-1 mx-1 rounded-full ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'}`} 
            />
          ))}
        </div>
        
        {renderStep()}
        
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Create Agent
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgentModal;
