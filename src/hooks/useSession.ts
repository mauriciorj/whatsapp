"use client";

import { createClient } from "@/db/supabase/client";
import { useEffect, useState } from "react";

const useSession = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    data: session,
  };
};

export default useSession;
