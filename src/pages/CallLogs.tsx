
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Phone, Search } from 'lucide-react';
import { useVapi } from '@/contexts/VapiContext';
import { VapiCall } from '@/services/vapiService';
import VapiConfig from '@/components/vapi/VapiConfig';

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

const CallLogs = () => {
  const { vapiService, assistantId, isConfigured } = useVapi();
  const [calls, setCalls] = useState<VapiCall[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<VapiCall[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCalls = async () => {
    if (!vapiService || !assistantId) return;
    
    setIsLoading(true);
    try {
      const callsData = await vapiService.getCalls(assistantId, 100);
      setCalls(callsData);
      setFilteredCalls(callsData);
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

  useEffect(() => {
    let filtered = calls;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(call => 
        call.customer.number?.includes(searchTerm) ||
        call.customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(call => call.status === statusFilter);
    }

    setFilteredCalls(filtered);
  }, [calls, searchTerm, statusFilter]);

  const formatCustomerInfo = (call: VapiCall) => {
    if (call.customer.name) return call.customer.name;
    if (call.customer.email) return call.customer.email;
    return call.customer.number || 'Unknown';
  };

  const getCallResult = (call: VapiCall) => {
    if (call.status !== 'ended') return 'Pending';
    if (call.analysis?.successEvaluation === 'success') return 'Success';
    if (call.duration && call.duration > 30) return 'Completed';
    return 'No Answer';
  };

  if (!isConfigured) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Call Logs</h1>
          <p className="text-muted-foreground">Configure Vapi to view call logs</p>
        </div>
        <div className="flex items-center justify-center min-h-[40vh]">
          <VapiConfig />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Call Logs</h1>
        <p className="text-muted-foreground">View and analyze all calls made by your voice assistant</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, phone, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ended">Ended</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectItem value="ringing">Ringing</SelectItem>
          </SelectContent>
        </Select>
        
        <Button onClick={fetchCalls} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>
      
      {isLoading && calls.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading call logs...</p>
          </div>
        </div>
      ) : filteredCalls.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Result</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
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
                  <TableCell>{getCallResult(call)}</TableCell>
                  <TableCell className="text-right">
                    {call.recordingUrl && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(call.recordingUrl, '_blank')}
                      >
                        Listen
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border border-dashed rounded-lg">
          <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
            <Phone className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium">No calls found</h3>
          <p className="text-muted-foreground mb-4">
            {calls.length === 0 ? "No calls have been made yet" : "No calls match your current filters"}
          </p>
          {calls.length > 0 && (
            <Button variant="outline" onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
              Reset Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CallLogs;
