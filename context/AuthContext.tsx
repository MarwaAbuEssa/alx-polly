'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createBrowserClient } from '@/lib/supabase';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signUp: (params: { email: string; password: string; options?: { data?: Record<string, any> } }) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for active session on mount
    const checkSession = async () => {
      try {
        const supabase = createBrowserClient();
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        
        // Set up auth state listener
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event, session) => {
            setUser(session?.user || null);
          }
        );
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = checkSession();
    
    return () => {
      if (unsubscribe && typeof unsubscribe.then === 'function') {
        unsubscribe.then((fn) => fn && fn());
      }
    };
  }, []);

  const value = {
    user,
    isLoading,
    signUp: async (params: { email: string; password: string; options?: { data?: Record<string, any> } }) => {
      const supabase = createBrowserClient();
      const response = await supabase.auth.signUp(params);
      return response;
    },
    signIn: async (email: string, password: string) => {
      const supabase = createBrowserClient();
      const response = await supabase.auth.signInWithPassword({ email, password });
      return response;
    },
    signOut: async () => {
      const supabase = createBrowserClient();
      const response = await supabase.auth.signOut();
      return response;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}