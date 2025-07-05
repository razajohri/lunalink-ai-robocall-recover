
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVapi } from '@/contexts/VapiContext';
import VapiConfig from '@/components/vapi/VapiConfig';

const Billing = () => {
  const { vapiService, assistantId, isConfigured } = useVapi();
  const [totalCost, setTotalCost] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBillingData = async () => {
    if (!vapiService || !assistantId) return;
    
    setIsLoading(true);
    try {
      const calls = await vapiService.getCalls(assistantId, 1000); // Get more calls for billing
      const cost = calls.reduce((sum, call) => sum + (call.cost || 0), 0);
      const minutes = calls.reduce((sum, call) => sum + (call.duration || 0), 0) / 60; // Convert to minutes
      
      setTotalCost(cost);
      setTotalMinutes(minutes);
    } catch (error) {
      console.error('Error fetching billing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConfigured) {
      fetchBillingData();
    }
  }, [isConfigured, vapiService, assistantId]);

  // Mock plan data - in a real app this would come from your backend
  const currentPlan = {
    name: "Business",
    minutesTotal: 1000,
    price: "$49",
    nextBillingDate: "July 7, 2025",
  };

  const plans = [
    {
      name: "Starter",
      price: "$19",
      minutes: 200,
      features: [
        "Up to 3 voice assistants",
        "Basic analytics",
        "Email support",
        "Call recordings",
      ],
      popular: false
    },
    {
      name: "Business",
      price: "$49",
      minutes: 1000,
      features: [
        "Up to 10 voice assistants",
        "Advanced analytics",
        "Priority support",
        "Custom voice options",
        "Real-time monitoring",
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      minutes: 3000,
      features: [
        "Unlimited voice assistants",
        "Premium analytics",
        "24/7 dedicated support",
        "Custom integrations",
        "White-label options",
        "Multi-user access",
      ],
      popular: false
    }
  ];

  const usagePercentage = currentPlan.minutesTotal > 0 ? (totalMinutes / currentPlan.minutesTotal) * 100 : 0;
  const costPerMinute = totalMinutes > 0 ? totalCost / totalMinutes : 0;

  if (!isConfigured) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Billing &amp; Usage</h1>
          <p className="text-gray-500">Configure Vapi to view billing information</p>
        </div>
        <div className="flex items-center justify-center min-h-[40vh]">
          <VapiConfig />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Billing &amp; Usage</h1>
          <p className="text-gray-500">Monitor your AI voice assistant usage and costs</p>
        </div>
        <Button onClick={fetchBillingData} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh Data'}
        </Button>
      </div>

      {/* Current Usage Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Usage</CardTitle>
          <CardDescription>
            Your voice assistant minutes and costs for the current billing cycle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">
                    {totalMinutes.toFixed(1)} / {currentPlan.minutesTotal} minutes used
                  </span>
                  <Badge variant={usagePercentage > 90 ? "destructive" : "default"}>
                    {usagePercentage.toFixed(0)}%
                  </Badge>
                </div>
                <Progress value={usagePercentage} className="h-3" />
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Total Cost</div>
                <div className="text-2xl font-bold">{vapiService?.formatCurrency(totalCost) || '$0.00'}</div>
                <div className="text-sm text-gray-500">
                  Cost per minute: {vapiService?.formatCurrency(costPerMinute) || '$0.00'}
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Next billing date: {currentPlan.nextBillingDate}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button variant="outline">View Usage Details</Button>
            <Button>Upgrade Plan</Button>
          </div>
        </CardFooter>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
          <CardDescription>
            Detailed breakdown of your Vapi usage costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="font-medium">Total API Calls Cost</span>
              <span className="font-bold">{vapiService?.formatCurrency(totalCost) || '$0.00'}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalMinutes.toFixed(1)}</div>
                <div className="text-sm text-gray-500">Total Minutes</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{vapiService?.formatCurrency(costPerMinute) || '$0.00'}</div>
                <div className="text-sm text-gray-500">Avg Cost/Minute</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{vapiService?.formatCurrency(totalCost) || '$0.00'}</div>
                <div className="text-sm text-gray-500">Total Spent</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Plan Card */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Current Plan</h2>
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{currentPlan.name}</span>
              <span>{currentPlan.price}/month</span>
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your current subscription plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg mb-2">
              Features:
            </div>
            <ul className="space-y-2">
              {plans.find(plan => plan.name === currentPlan.name)?.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">✓</span> {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary">Manage Subscription</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={plan.popular ? "border-blue-500 border-2 shadow-lg" : ""}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular && (
                    <Badge className="bg-blue-500">Popular</Badge>
                  )}
                </div>
                <CardDescription className="text-3xl font-bold">
                  {plan.price}<span className="text-sm font-normal">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 font-medium">{plan.minutes} voice minutes included</div>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <span className="mr-2 text-green-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={plan.name === currentPlan.name ? "outline" : "default"} 
                  className="w-full"
                >
                  {plan.name === currentPlan.name ? "Current Plan" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;
