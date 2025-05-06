
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart2 } from 'lucide-react';

// Mock data
const callsData = [
  { day: 'Mon', calls: 24, recovered: 8 },
  { day: 'Tue', calls: 18, recovered: 5 },
  { day: 'Wed', calls: 32, recovered: 12 },
  { day: 'Thu', calls: 27, recovered: 9 },
  { day: 'Fri', calls: 35, recovered: 14 },
  { day: 'Sat', calls: 15, recovered: 4 },
  { day: 'Sun', calls: 12, recovered: 3 },
];

const callResultsData = [
  { name: 'Recovered', value: 55 },
  { name: 'No Answer', value: 23 },
  { name: 'Declined', value: 12 },
  { name: 'Call Back', value: 10 },
];

const callHourData = [
  { hour: '8AM', calls: 5 },
  { hour: '9AM', calls: 8 },
  { hour: '10AM', calls: 12 },
  { hour: '11AM', calls: 15 },
  { hour: '12PM', calls: 10 },
  { hour: '1PM', calls: 8 },
  { hour: '2PM', calls: 12 },
  { hour: '3PM', calls: 18 },
  { hour: '4PM', calls: 20 },
  { hour: '5PM', calls: 15 },
  { hour: '6PM', calls: 10 },
  { hour: '7PM', calls: 5 },
];

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#6366f1'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Analyze call performance and conversion data</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Calls vs Recovered Carts</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={callsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="calls" name="Total Calls" fill="#7c4dff" />
                  <Bar dataKey="recovered" name="Carts Recovered" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Call Results</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={callResultsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {callResultsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Calls by Hour of Day</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={callHourData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calls" name="Calls Made" fill="#4a66e8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cart Recovery Rate</span>
                <span className="font-medium">35.4%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-luna-purple h-2.5 rounded-full" style={{ width: '35.4%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Avg. Order Value of Recovered Carts</span>
                <span className="font-medium">$68.25</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-luna-success h-2.5 rounded-full" style={{ width: '68.25%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Call Answer Rate</span>
                <span className="font-medium">42.8%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-luna-blue h-2.5 rounded-full" style={{ width: '42.8%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">ROI</span>
                <span className="font-medium">524%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Products Recovered</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Premium T-Shirt</span>
                  <span className="text-sm font-medium">$29.99 × 24 units</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-luna-purple h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Wireless Earbuds</span>
                  <span className="text-sm font-medium">$89.99 × 18 units</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-luna-purple h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Phone Case</span>
                  <span className="text-sm font-medium">$19.99 × 15 units</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-luna-purple h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Vitamin Subscription</span>
                  <span className="text-sm font-medium">$49.99 × 12 units</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-luna-purple h-2.5 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Smart Watch</span>
                  <span className="text-sm font-medium">$199.99 × 8 units</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-luna-purple h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
