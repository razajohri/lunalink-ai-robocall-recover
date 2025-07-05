
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Volume2, MessageSquare } from 'lucide-react';
import { useVapi } from '@/contexts/VapiContext';
import { VapiCall } from '@/services/vapiService';

const getStatusClass = (status: string) => {
  switch (status) {
    case 'ended':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'queued':
    case 'ringing':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const RecentCallsTable = () => {
  const { vapiService, assistantId, isConfigured } = useVapi();
  const [calls, setCalls] = useState<VapiCall[]>([]);
  const [selectedCall, setSelectedCall] = useState<VapiCall | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCalls = async () => {
    if (!vapiService || !assistantId) return;
    
    setIsLoading(true);
    try {
      const callsData = await vapiService.getCalls(assistantId, 10);
      setCalls(callsData);
    } catch (error) {
      console.error('Error fetching calls:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConfigured) {
      fetchCalls();
    }
  }, [isConfigured, vapiService, assistantId]);

  const handleViewTranscript = (call: VapiCall) => {
    setSelectedCall(call);
    setDialogOpen(true);
  };

  const formatCustomerInfo = (call: VapiCall) => {
    if (call.customer.name) return call.customer.name;
    if (call.customer.email) return call.customer.email;
    return call.customer.number || 'Unknown';
  };

  if (!isConfigured) {
    return null;
  }

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Calls</CardTitle>
        <Button variant="outline" size="sm" onClick={fetchCalls} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh'}
        </Button>
      </CardHeader>
      <CardContent>
        {calls.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No calls found for this assistant</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    <div className="font-medium">{formatCustomerInfo(call)}</div>
                    <div className="text-sm text-muted-foreground">{call.customer.number}</div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(call.status)}`}>
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(call.startedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    {call.duration ? vapiService?.formatDuration(call.duration) : '--:--'}
                  </TableCell>
                  <TableCell>
                    {call.cost ? vapiService?.formatCurrency(call.cost) : '--'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {call.recordingUrl && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => window.open(call.recordingUrl, '_blank')}
                          className="flex items-center gap-1"
                        >
                          <Volume2 size={16} />
                          <span>Listen</span>
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewTranscript(call)}
                        disabled={!call.transcript}
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
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Call Transcript</DialogTitle>
            </DialogHeader>
            {selectedCall && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 mb-2">
                    {formatCustomerInfo(selectedCall)} • {new Date(selectedCall.startedAt).toLocaleString()}
                    {selectedCall.duration && ` • ${vapiService?.formatDuration(selectedCall.duration)}`}
                  </p>
                  {selectedCall.summary && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Summary:</h4>
                      <p className="text-sm">{selectedCall.summary}</p>
                    </div>
                  )}
                  {selectedCall.transcript && (
                    <div>
                      <h4 className="font-medium mb-2">Transcript:</h4>
                      <div className="whitespace-pre-line text-sm max-h-96 overflow-y-auto">
                        {selectedCall.transcript}
                      </div>
                    </div>
                  )}
                  {!selectedCall.transcript && !selectedCall.summary && (
                    <p className="text-sm text-gray-500">No transcript available for this call.</p>
                  )}
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
