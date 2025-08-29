'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PollCreateForm } from '@/components/polls/poll-create-form';
import Link from 'next/link';

export default function CreatePollPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create a New Poll</CardTitle>
          <CardDescription>
            Fill out the form below to create a new poll for others to vote on.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PollCreateForm />
        </CardContent>
        <CardFooter className="flex justify-start">
          <Link href="/polls">
            <Button variant="outline">Cancel</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}