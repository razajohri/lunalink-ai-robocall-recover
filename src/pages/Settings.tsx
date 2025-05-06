
import React, { useState } from 'react';
import SettingsForm from '@/components/settings/SettingsForm';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: 'Your Store Name',
    timeZone: 'ET',
    receiveEmailNotifications: true,
    dailySummaryReports: false,
    retryFailedCalls: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    emailNotifications: 'store@example.com'
  });
  
  const handleSettingsChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your account and preferences</p>
      </div>
      
      <SettingsForm 
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onSaveSettings={handleSaveSettings}
      />
    </div>
  );
};

export default Settings;
