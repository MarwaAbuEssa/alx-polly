import { createServerSideClient, fetchPollResults } from '@/lib/supabase';
import PollClientPage from '@/components/polls/poll-client-page';

export default async function PollDetailPage({ params }: { params: { pollId: string } }) {
  const supabase = createServerSideClient();
  const { data: poll, error } = await supabase.from('polls').select('*').eq('id', params.pollId).single();

  if (error) {
    console.error('Error fetching poll:', error);
    return <div>Error loading poll.</div>;
  }

  if (!poll) {
    return <div>Poll not found.</div>;
  }

  const initialVotes = await fetchPollResults(params.pollId);

  return (
    <PollClientPage initialPoll={poll} initialVotes={initialVotes} />
  );
}