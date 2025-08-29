'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PollVoteForm } from '@/components/polls/poll-vote-form';
import { PollResults } from '@/components/polls/poll-results';

export default function PollDetailPage({ params }: { params: { id: string } }) {
  const [hasVoted, setHasVoted] = useState(false);
  
  // This would be replaced with actual data fetching
  const mockPoll = {
    id: params.id,
    title: 'What is your favorite programming language?',
    description: 'Please vote for your preferred programming language',
    options: [
      { id: '1', text: 'JavaScript', votes: 42 },
      { id: '2', text: 'Python', votes: 38 },
      { id: '3', text: 'TypeScript', votes: 27 },
      { id: '4', text: 'Java', votes: 15 },
    ],
    createdAt: new Date(),
    createdBy: 'user123',
    isActive: true,
  };

  const handleVote = (optionId: string) => {
    console.log('Voted for option:', optionId);
    setHasVoted(true);
    // This would be replaced with actual vote submission logic
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{mockPoll.title}</CardTitle>
          <CardDescription>{mockPoll.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {hasVoted ? (
            <PollResults poll={mockPoll} />
          ) : (
            <PollVoteForm poll={mockPoll} onVote={handleVote} />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Polls
          </Button>
          {hasVoted && (
            <Button variant="ghost" onClick={() => setHasVoted(false)}>
              Vote Again
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}