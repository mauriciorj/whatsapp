"use server";

import createServer from "@/db/supabase/server";

const updateUserProfile = async ({
  first_name,
  last_name,
  plan,
  user_id,
  role,
  account_id,
}: {
  first_name: string;
  last_name: string;
  plan: string;
  user_id: string;
  role: string;
  account_id: string;
}) => {
  const supabase = await createServer();
  const { error } = await supabase
    .from("user_profile")
    .update({
      country: "Brasil",
      first_name,
      last_name,
      plan,
      subscription_status: "not active",
      role,
      account_id,
    })
    .eq("user_id", user_id);
  return error;
};

export default updateUserProfile;
