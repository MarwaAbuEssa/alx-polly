import { createClient } from '@supabase/supabase-js';



// Create a Supabase client for browser-side usage
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

// Create a Supabase client for server-side usage
export const createServerSideClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
};

// Helper functions for authentication
export const signUp = async (params: {
  email: string;
  password: string;
  options?: { data?: Record<string, unknown> };
}) => {
  const supabase = createBrowserClient();
  return supabase.auth.signUp(params);
};

export const signIn = async (email: string, password: string) => {
  const supabase = createBrowserClient();
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  const supabase = createBrowserClient();
  return supabase.auth.signOut();
};

export const getSession = async () => {
  const supabase = createBrowserClient();
  return supabase.auth.getSession();
};

export const getUser = async () => {
  const supabase = createBrowserClient();
  const response = await supabase.auth.getUser();
  return response.data?.user;
};

export const fetchPollResults = async (pollId: string) => {
  const supabase = createServerSideClient();
  
  // Fetch poll data
  const { data: pollData, error: pollError } = await supabase
    .from('polls')
    .select('*')
    .eq('id', pollId)
    .single();

  if (pollError) throw pollError;

  // Fetch votes for this poll
  const { data: votesData, error: votesError } = await supabase
    .from('votes')
    .select('option_id')
    .eq('poll_id', pollId);

  if (votesError) throw votesError;

  // Count votes per option

  const voteCounts = votesData.reduce((acc, vote) => {
    acc[vote.option_id] = (acc[vote.option_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format results for chart

  // Assuming options column in polls table is an array of objects: 
  // { id: string, question: string }[]
  const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);

  return pollData.options.map((option: { id: string; text: string }) => ({

    id: option.id,
    value: voteCounts[option.id] || 0, 
    label: `${option.text} (${((voteCounts[option.id] || 0) / totalVotes * 100).toFixed(1)}%)`
  }));
};