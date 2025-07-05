
import React, { createContext, useContext, useState, useEffect } from 'react';
import VapiService from '@/services/vapiService';

interface VapiContextType {
  vapiService: VapiService | null;
  assistantId: string;
  apiKey: string;
  setCredentials: (apiKey: string, assistantId: string) => void;
  isConfigured: boolean;
}

const VapiContext = createContext<VapiContextType | undefined>(undefined);

export const useVapi = () => {
  const context = useContext(VapiContext);
  if (context === undefined) {
    throw new Error('useVapi must be used within a VapiProvider');
  }
  return context;
};

export const VapiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [assistantId, setAssistantId] = useState<string>('');
  const [vapiService, setVapiService] = useState<VapiService | null>(null);

  useEffect(() => {
    // Load from localStorage on mount
    const savedApiKey = localStorage.getItem('vapi_api_key');
    const savedAssistantId = localStorage.getItem('vapi_assistant_id');
    
    if (savedApiKey && savedAssistantId) {
      setApiKey(savedApiKey);
      setAssistantId(savedAssistantId);
      setVapiService(new VapiService(savedApiKey));
    }
  }, []);

  const setCredentials = (newApiKey: string, newAssistantId: string) => {
    setApiKey(newApiKey);
    setAssistantId(newAssistantId);
    
    // Save to localStorage
    localStorage.setItem('vapi_api_key', newApiKey);
    localStorage.setItem('vapi_assistant_id', newAssistantId);
    
    // Create new service instance
    setVapiService(new VapiService(newApiKey));
  };

  const isConfigured = Boolean(apiKey && assistantId && vapiService);

  return (
    <VapiContext.Provider value={{
      vapiService,
      assistantId,
      apiKey,
      setCredentials,
      isConfigured
    }}>
      {children}
    </VapiContext.Provider>
  );
};
