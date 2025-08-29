import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';

// Types
type SupabaseClient = ReturnType<typeof createClient>;

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
  // Dynamic import for server-side only
  // This ensures 'next/headers' is only imported on the server
  const { cookies } = require('next/headers');
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => {
          // In Next.js App Router, cookies() is synchronous in Server Components
          return cookies().get(name)?.value;
        },
        set: (name, value, options) => {
          // In Next.js App Router, cookies() is synchronous in Server Components
          cookies().set(name, value, options);
        },
        remove: (name, options) => {
          // In Next.js App Router, cookies() is synchronous in Server Components
          cookies().delete(name, options);
        },
      },
    }
  );
};

// Helper functions for authentication
export const signUp = async (params: {
  email: string;
  password: string;
  options?: { data?: Record<string, any> };
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