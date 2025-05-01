"use server";

import { createServer } from "@/supabase/server";

const GetUserProfile = async () => {
  const supabase = await createServer();

  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user?.id) {
    return null;
  }

  const { data, error }: any = await supabase
    .from("user_profile")
    .select("email, first_name, last_name, user_id, company_id")
    .eq("user_id", userData?.user?.id);

  if (error) {
    return error;
  }

  return data[0];
};

export default GetUserProfile;
