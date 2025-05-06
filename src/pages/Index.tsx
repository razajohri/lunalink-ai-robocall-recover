
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Welcome from '@/components/onboarding/Welcome';

const Index = () => {
  const [onboarded, setOnboarded] = useState(false);
  
  const handleGetStarted = () => {
    // In a real app, we would make an API call to record onboarding status
    setOnboarded(true);
  };
  
  // If onboarded, redirect to dashboard
  if (onboarded) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Show welcome/onboarding screen
  return <Welcome onGetStarted={handleGetStarted} />;
};

export default Index;
