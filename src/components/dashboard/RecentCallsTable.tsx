
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Volume2, MessageSquare } from 'lucide-react';

const mockCalls = [
  { 
    id: '1', 
    customer: 'John Smith', 
    email: 'john@example.com', 
    status: 'completed', 
    time: 'May 6, 2025 10:23 AM', 
    duration: '1:38',
    transcript: "AI: Hello, this is Luna from Example Store. I noticed you left some items in your cart. Would you like to complete your purchase today?\nCustomer: Oh yes, I got distracted. I'm still interested.\nAI: Great! I can help you complete that purchase right now. Would you like me to send a checkout link to your email?\nCustomer: Yes, please do.\nAI: Perfect! I've sent the link to your email. Is there anything else you need help with today?\nCustomer: No, that's all. Thanks!\nAI: You're welcome! Have a great day."
  },
  { 
    id: '2', 
    customer: 'Emily Johnson', 
    email: 'emily@example.com', 
    status: 'completed', 
    time: 'May 6, 2025 9:45 AM', 
    duration: '2:10',
    transcript: "AI: Hello, this is Luna from Example Store. I'm calling about your recent cart that was left incomplete. Is this a good time to talk?\nCustomer: I'm actually not interested anymore.\nAI: I understand. May I ask what made you change your mind?\nCustomer: The shipping costs were too high.\nAI: I appreciate your feedback. Would a 10% discount code help with offsetting the shipping costs?\nCustomer: That might work actually. Can you send it to me?\nAI: Absolutely! I'll send that to your email right away. Thank you for considering us again."
  },
  { 
    id: '3', 
    customer: 'Michael Brown', 
    email: 'michael@example.com', 
    status: 'failed', 
    time: 'May 6, 2025 8:30 AM', 
    duration: '0:12',
    transcript: "AI: Hello, this is Luna from Example Store calling about your recent order. [Call disconnected]"
  },
  { 
    id: '4', 
    customer: 'Sarah Wilson', 
    email: 'sarah@example.com', 
    status: 'in-progress', 
    time: 'May 6, 2025 7:55 AM', 
    duration: '--:--',
    transcript: "Call in progress..."
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const RecentCallsTable = () => {
  const [selectedCall, setSelectedCall] = useState<typeof mockCalls[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewTranscript = (call: typeof mockCalls[0]) => {
    setSelectedCall(call);
    setDialogOpen(true);
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Calls</CardTitle>
        <Button variant="outline" size="sm">View all calls</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCalls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>
                  <div className="font-medium">{call.customer}</div>
                  <div className="text-sm text-muted-foreground">{call.email}</div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(call.status)}`}>
                    {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{call.time}</TableCell>
                <TableCell>{call.duration}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      disabled={call.status === 'in-progress'}
                      className="flex items-center gap-1"
                    >
                      <Volume2 size={16} />
                      <span>Listen</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewTranscript(call)}
                      disabled={call.status === 'in-progress'}
                      className="flex items-center gap-1"
                    >
                      <MessageSquare size={16} />
                      <span>Transcript</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Call Transcript</DialogTitle>
            </DialogHeader>
            {selectedCall && (
              <div className="bg-slate-50 p-4 rounded-md max-h-96 overflow-y-auto">
                <p className="text-sm text-gray-500 mb-2">
                  {selectedCall.customer} • {selectedCall.time} • {selectedCall.duration}
                </p>
                <div className="whitespace-pre-line text-sm">
                  {selectedCall.transcript}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RecentCallsTable;
