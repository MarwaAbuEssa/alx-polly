'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Poll } from '@/lib/types';

interface PollVoteFormProps {
  poll: Poll;
  onVote: (optionId: string) => void;
}

export function PollVoteForm({ poll, onVote }: PollVoteFormProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      onVote(selectedOption);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        {poll.options.map((option) => (
          <div
            key={option.id}
            className={`p-4 border rounded-md cursor-pointer transition-colors ${selectedOption === option.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
            onClick={() => setSelectedOption(option.id)}
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="poll-option"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="sr-only"
              />
              <div className={`w-4 h-4 border rounded-full flex items-center justify-center ${selectedOption === option.id ? 'border-primary' : 'border-muted-foreground'}`}>
                {selectedOption === option.id && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-base">{option.text}</span>
            </label>
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={!selectedOption}
      >
        Submit Vote
      </Button>
    </form>
  );
}