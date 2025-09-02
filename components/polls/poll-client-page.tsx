'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PollVoteForm } from '@/components/polls/poll-vote-form';
import { PollResults } from '@/components/polls/poll-results';
import { createServerSideClient, fetchPollResults } from '@/lib/supabase';
import { Poll } from '@/lib/types';

interface PollClientPageProps {
  initialPoll: Poll;
  initialVotes: { option_id: string; count: number }[];
}

export default function PollClientPage({ initialPoll, initialVotes }: PollClientPageProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [pollData, setPollData] = useState(initialPoll);
  const [voteResults, setVoteResults] = useState(initialVotes);

  const handleVote = async (optionId: string) => {
    const supabase = createServerSideClient();
    const { error: voteError } = await supabase.from('votes').insert({ poll_id: pollData.id, option_id: optionId });

    if (voteError) {
      console.error('Error submitting vote:', voteError);
      return;
    }

    setHasVoted(true);
    const updatedResults = await fetchPollResults(pollData.id);
    setVoteResults(updatedResults);
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{pollData.title}</CardTitle>
          <CardDescription>{pollData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {hasVoted ? (
            <PollResults poll={{ ...pollData, id: pollData.id }} initialVotes={voteResults} />
          ) : (
            <PollVoteForm poll={{ ...pollData, id: pollData.id }} onVote={handleVote} />
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