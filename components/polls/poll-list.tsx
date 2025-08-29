'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Poll } from '@/lib/types';

export function PollList() {
  // This would be replaced with actual data fetching
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
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
    },
    {
      id: '2',
      title: 'Which frontend framework do you prefer?',
      description: 'Vote for your favorite frontend framework',
      options: [
        { id: '1', text: 'React', votes: 56 },
        { id: '2', text: 'Vue', votes: 34 },
        { id: '3', text: 'Angular', votes: 29 },
        { id: '4', text: 'Svelte', votes: 18 },
      ],
      createdAt: new Date(),
      createdBy: 'user456',
      isActive: true,
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="max-w-7xl mx-auto"></div>
      <div className="max-w-7xl mx-auto">
      </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"></div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg-blue-50 p-6 rounded-lg shadow-inner">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {polls.map((poll) => (
        <Card key={poll.id} className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-2">{poll.title}</CardTitle>
            <CardDescription className="line-clamp-3">{poll.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              {poll.options.length} options • {poll.options.reduce((total, option) => total + option.votes, 0)} votes
            </p>
          </CardContent>
          <CardFooter>
            <Link href={`/polls/${poll.id}`} className="w-full">
              <Button variant="outline" className="w-full">View Poll</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div></div></div>
  );
}

function getTotalVotes(poll: Poll): number {
return poll.options.reduce((total, option) => total + option.votes, 0);
}