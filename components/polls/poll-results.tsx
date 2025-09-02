'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChartComponent } from './bar-chart-component';
import { Poll } from '@/lib/types';

interface PollResultData {
  id: number;
  value: number;
  label: string;
}

interface PieChartComponentProps {
  data: PollResultData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B'];

export function PieChartComponent({ data }: PieChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          nameKey="label"
          label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface PollBarChartResultsProps {
  poll: Poll;
  initialVotes: { option_id: string; count: number }[];
}

export function PollResults({ poll, initialVotes }: PollBarChartResultsProps) {
  const totalVotes = initialVotes.reduce((sum, vote) => sum + vote.count, 0);

  const chartData = poll.options.map(option => ({
    name: option.text,
    value: initialVotes.find(vote => vote.option_id === option.id)?.count || 0,
    id: parseInt(option.id),
    label: option.text,
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Results</h3>
      <div className="space-y-3">
        {poll.options.map((option) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          
          return (
            <div key={option.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{option.text}</span>
                  <span className="font-medium">{percentage}%</span>
               </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{option.votes} votes</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Visual Representation</h3>
          <PieChartComponent data={chartData} />
          <BarChartComponent data={chartData} />
        </div>
        <p className="text-sm text-muted-foreground pt-2">
          Total votes: {totalVotes}
         </p>
    </div>
  );
}