"use server";

import createServer from "@/supabase/server";

const GetUser = async () => {
  const supabase = await createServer();

  const { data } = await supabase.auth.getUser();

  return data;
};

export default GetUser;
