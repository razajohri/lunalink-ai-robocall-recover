
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

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
              <TableHead>Result</TableHead>
              <TableHead>Action</TableHead>
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
                <TableCell>{call.result}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" disabled={call.status === 'in-progress'}>
                    Listen
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentCallsTable;
