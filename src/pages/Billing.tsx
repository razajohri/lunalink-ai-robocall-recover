
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Billing = () => {
  // Mock data - in a real application this would come from your backend
  const currentPlan = {
    name: "Business",
    minutesUsed: 450,
    minutesTotal: 1000,
    price: "$49",
    nextBillingDate: "June 7, 2025",
  };

  const plans = [
    {
      name: "Starter",
      price: "$19",
      minutes: 200,
      features: [
        "Up to 3 voice agents",
        "Basic analytics",
        "Email support",
        "Knowledge base integration",
      ],
      popular: false
    },
    {
      name: "Business",
      price: "$49",
      minutes: 1000,
      features: [
        "Up to 10 voice agents",
        "Advanced analytics",
        "Priority support",
        "Custom voice options",
        "Twilio SMS integration",
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      minutes: 3000,
      features: [
        "Unlimited voice agents",
        "Premium analytics",
        "24/7 dedicated support",
        "Custom integrations",
        "White-label options",
        "Multi-user access",
      ],
      popular: false
    }
  ];

  // Calculate usage percentage
  const usagePercentage = (currentPlan.minutesUsed / currentPlan.minutesTotal) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Billing &amp; Usage</h1>
        <p className="text-gray-500">Manage your subscription and monitor voice minutes usage</p>
      </div>

      {/* Current Usage Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Usage</CardTitle>
          <CardDescription>
            Your voice agent minutes for the current billing cycle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {currentPlan.minutesUsed} / {currentPlan.minutesTotal} minutes used
              </span>
              <Badge variant={usagePercentage > 90 ? "destructive" : "default"}>
                {usagePercentage.toFixed(0)}%
              </Badge>
            </div>
            <Progress value={usagePercentage} className="h-3" />
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
                <div className="mb-4 font-medium">{plan.minutes} voice minutes</div>
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

      {/* Usage History */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Usage History</h2>
        <Card>
          <CardHeader>
            <CardTitle>Recent Billing Cycles</CardTitle>
            <CardDescription>
              Historical voice agent minutes usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { period: "May 2025", usage: 450, total: 1000, percentage: 45 },
                { period: "April 2025", usage: 780, total: 1000, percentage: 78 },
                { period: "March 2025", usage: 920, total: 1000, percentage: 92 }
              ].map((cycle, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{cycle.period}</span>
                    <span className="text-sm">{cycle.usage} / {cycle.total} minutes</span>
                  </div>
                  <Progress value={cycle.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Billing;
