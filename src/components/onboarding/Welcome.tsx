
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeProps {
  onGetStarted: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-luna-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full luna-gradient flex items-center justify-center">
            <span className="text-white text-xl font-bold">L</span>
          </div>
          <CardTitle className="text-2xl">Welcome to LunaLink AI</CardTitle>
          <CardDescription>
            Recover abandoned carts with AI-powered voice calls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
              <div className="rounded-full bg-luna-purple/10 w-10 h-10 mx-auto flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-luna-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Create Voice Agents</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Build AI voice agents to call customers who abandoned their carts
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
              <div className="rounded-full bg-luna-purple/10 w-10 h-10 mx-auto flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-luna-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="font-medium">Track Call Performance</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor call metrics and recovered sales in real-time
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
              <div className="rounded-full bg-luna-purple/10 w-10 h-10 mx-auto flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-luna-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Increase Sales</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Convert more abandoned carts into completed orders
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onGetStarted}>
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Welcome;
