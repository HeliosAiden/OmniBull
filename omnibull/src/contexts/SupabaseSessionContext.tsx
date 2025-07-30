"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Session = Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"];

const SupabaseSessionContext = createContext<Session | null>(null);

export function SupabaseSessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    load();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <SupabaseSessionContext.Provider value={session}>
      {children}
    </SupabaseSessionContext.Provider>
  );
}

export const useSupabaseSession = () => useContext(SupabaseSessionContext);
