"use server";

import createServer from "@/supabase/server";

const LogOutUser = async () => {
  const supabase = await createServer();

  const { error } = await supabase.auth.signOut();
  if (!error) {
    return true;
  }

  return error;
};

export default LogOutUser;
