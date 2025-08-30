import { PieChartComponent } from '@/components/polls/poll-results';
import { fetchPollResults } from '@/lib/supabase';

export default async function PollResultsPage({
  params,
}: {
  params: { pollId: string };
}) {

  const polls = await params;

  const results = await fetchPollResults(polls.pollId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Polls Dashboard</h1>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <PieChartComponent data={results} />

      </div>
    </div>
  );
}