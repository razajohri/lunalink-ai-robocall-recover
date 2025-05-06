
import React, { useState } from 'react';
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
import { Phone, Search, Calendar } from 'lucide-react';

// Mock call data
const mockCalls = [
  { 
    id: '1', 
    customer: 'John Smith', 
    email: 'john@example.com', 
    status: 'completed', 
    time: 'May 6, 2025 10:23 AM', 
    duration: '1:38', 
    result: 'Cart Recovered' 
  },
  { 
    id: '2', 
    customer: 'Emily Johnson', 
    email: 'emily@example.com', 
    status: 'completed', 
    time: 'May 6, 2025 9:45 AM', 
    duration: '2:10', 
    result: 'No Response' 
  },
  { 
    id: '3', 
    customer: 'Michael Brown', 
    email: 'michael@example.com', 
    status: 'failed', 
    time: 'May 6, 2025 8:30 AM', 
    duration: '0:12', 
    result: 'No Answer' 
  },
  { 
    id: '4', 
    customer: 'Sarah Wilson', 
    email: 'sarah@example.com', 
    status: 'in-progress', 
    time: 'May 6, 2025 7:55 AM', 
    duration: '--:--', 
    result: 'Pending' 
  },
  { 
    id: '5', 
    customer: 'Robert Jones', 
    email: 'robert@example.com', 
    status: 'completed', 
    time: 'May 5, 2025 4:12 PM', 
    duration: '3:05', 
    result: 'Cart Recovered' 
  },
  { 
    id: '6', 
    customer: 'Jennifer Davis', 
    email: 'jennifer@example.com', 
    status: 'failed', 
    time: 'May 5, 2025 2:45 PM', 
    duration: '0:08', 
    result: 'Declined Call' 
  },
  { 
    id: '7', 
    customer: 'David Miller', 
    email: 'david@example.com', 
    status: 'completed', 
    time: 'May 5, 2025 11:30 AM', 
    duration: '1:46', 
    result: 'Call Back Later' 
  },
  { 
    id: '8', 
    customer: 'Lisa Moore', 
    email: 'lisa@example.com', 
    status: 'completed', 
    time: 'May 5, 2025 10:15 AM', 
    duration: '2:22', 
    result: 'Cart Recovered' 
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

const CallLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('last-7-days');
  
  // Filter calls based on search term and filters
  const filteredCalls = mockCalls.filter(call => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      call.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      call.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    
    // We would add date filtering logic here in a real implementation
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Call Logs</h1>
        <p className="text-muted-foreground">View and analyze all calls made by your voice agents</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer or email"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last-7-days">Last 7 Days</SelectItem>
            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredCalls.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Result</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
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
                  <TableCell>{call.result}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" disabled={call.status === 'in-progress'}>
                      Listen
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border border-dashed rounded-lg">
          <div className="rounded-full bg-luna-purple/10 w-16 h-16 flex items-center justify-center mb-4">
            <Phone className="h-8 w-8 text-luna-purple" />
          </div>
          <h3 className="text-lg font-medium">No calls found</h3>
          <p className="text-muted-foreground mb-4">No calls match your current filters</p>
          <Button variant="outline" onClick={() => { setSearchTerm(''); setStatusFilter('all'); setDateFilter('last-7-days'); }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CallLogs;
