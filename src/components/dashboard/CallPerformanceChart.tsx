
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const last7Days = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  return date.toLocaleDateString('en-US', { weekday: 'short' });
});

const mockData = [
  { name: last7Days[0], calls: 8, recovered: 2 },
  { name: last7Days[1], calls: 15, recovered: 5 },
  { name: last7Days[2], calls: 12, recovered: 4 },
  { name: last7Days[3], calls: 18, recovered: 6 },
  { name: last7Days[4], calls: 25, recovered: 9 },
  { name: last7Days[5], calls: 20, recovered: 7 },
  { name: last7Days[6], calls: 22, recovered: 8 },
];

const CallPerformanceChart = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-lg">Call Performance</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c4dff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c4dff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="calls" 
                stroke="#7c4dff" 
                fillOpacity={1} 
                fill="url(#colorCalls)" 
                name="Calls Made"
              />
              <Area 
                type="monotone" 
                dataKey="recovered" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorRecovered)" 
                name="Carts Recovered"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallPerformanceChart;
