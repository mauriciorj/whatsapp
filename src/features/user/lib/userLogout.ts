"use client";

import { useRouter } from "next/navigation";
import createClient from "@/db/supabase/client";

const userLogout = async () => {
  const router = useRouter();

  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (!error) {
    router.refresh();
  }
};

export default userLogout;
