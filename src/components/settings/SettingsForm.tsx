
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SettingsFormProps {
  settings: {
    storeName: string;
    timeZone: string;
    receiveEmailNotifications: boolean;
    dailySummaryReports: boolean;
    retryFailedCalls: boolean;
    quietHoursStart: string;
    quietHoursEnd: string;
    emailNotifications: string;
  };
  onSettingsChange: (field: string, value: string | boolean) => void;
  onSaveSettings: () => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSettingsChange, onSaveSettings }) => {
  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure your account and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input 
              id="store-name" 
              value={settings.storeName}
              onChange={(e) => onSettingsChange('storeName', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timezone">Time Zone</Label>
            <Select 
              value={settings.timeZone}
              onValueChange={(value) => onSettingsChange('timeZone', value)}
            >
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ET">Eastern Time (ET)</SelectItem>
                <SelectItem value="CT">Central Time (CT)</SelectItem>
                <SelectItem value="MT">Mountain Time (MT)</SelectItem>
                <SelectItem value="PT">Pacific Time (PT)</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Control how you receive updates about calls and performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex-1">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={settings.receiveEmailNotifications}
              onCheckedChange={(checked) => onSettingsChange('receiveEmailNotifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="daily-summary" className="flex-1">Daily Summary Report</Label>
            <Switch
              id="daily-summary"
              checked={settings.dailySummaryReports}
              onCheckedChange={(checked) => onSettingsChange('dailySummaryReports', checked)}
            />
          </div>
          {settings.receiveEmailNotifications && (
            <div className="pt-2">
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input 
                id="notification-email" 
                type="email" 
                className="mt-1"
                value={settings.emailNotifications}
                onChange={(e) => onSettingsChange('emailNotifications', e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Call Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Call Settings</CardTitle>
          <CardDescription>Configure how your voice agent makes calls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="retry-calls" className="flex-1">Retry Failed Calls</Label>
            <Switch
              id="retry-calls"
              checked={settings.retryFailedCalls}
              onCheckedChange={(checked) => onSettingsChange('retryFailedCalls', checked)}
            />
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <Label className="mb-2 block">Quiet Hours (No calls during these hours)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quiet-start" className="text-sm">Start</Label>
                <Input 
                  id="quiet-start" 
                  type="time"
                  value={settings.quietHoursStart}
                  onChange={(e) => onSettingsChange('quietHoursStart', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="quiet-end" className="text-sm">End</Label>
                <Input 
                  id="quiet-end" 
                  type="time"
                  value={settings.quietHoursEnd}
                  onChange={(e) => onSettingsChange('quietHoursEnd', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsForm;
