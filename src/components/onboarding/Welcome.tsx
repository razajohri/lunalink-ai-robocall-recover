
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageSquare, BarChart, Users } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <img src="/lovable-uploads/354da74a-8510-41f7-9021-e86ef760aab2.png" alt="LunaLink AI" className="h-12 w-auto" />
              <h1 className="text-3xl font-extrabold text-white">LunaLink AI</h1>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Recover Abandoned Carts & Automate Customer Service 
              <span className="text-primary"> with AI Voice Agents</span>
            </h2>
            <p className="text-xl text-gray-300">
              Boost your sales and improve customer satisfaction with powerful AI voice and messaging agents that work 24/7.
            </p>
            <div className="pt-4">
              <Button onClick={onGetStarted} size="lg" className="text-lg px-8 py-6">
                Get Started
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-white">AI Voice Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Recover abandoned carts and provide customer service with natural-sounding voice calls</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-white">SMS Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Send personalized SMS with discount codes to recover abandoned carts via Twilio</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-white">Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Track call metrics and recovered sales with detailed analytics dashboards</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-white">24/7 Customer Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Provide round-the-clock customer service with AI-powered sales and support agents</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
