'use client';

import { Poll } from '@/lib/types';

interface PollResultsProps {
  poll: Poll;
}

export function PollResults({ poll }: PollResultsProps) {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

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
      <p className="text-sm text-muted-foreground pt-2">
        Total votes: {totalVotes}
      </p>
    </div>
  );
}