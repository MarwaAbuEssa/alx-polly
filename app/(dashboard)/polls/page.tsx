import { PollList } from '@/components/polls/poll-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PollsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Polls</h1>
        <Link href="/polls/create">
          <Button>Create New Poll</Button>
        </Link>
      </div>
      <PollList />
    </div>
  );
}