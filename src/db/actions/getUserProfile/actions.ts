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
    .select(
      "email, subscription_status, first_name, last_name, plan, user_id, account_id"
    )
    .eq("user_id", userData?.user?.id);

  if (error) {
    return error;
  }

  return data[0];
};

// const GetUserProfile = async ({ userId }: { userId?: string }) => {
//   if (!userId) return null;

//   const supabase = await createServer();

//   const { data, error }: any = await supabase
//     .from("user_profile")
//     .select(
//       `
//       email,
//       subscription_status,
//       first_name,
//       last_name,
//       plan,
//       user_id,
//       whatsapp (
//         numbers,
//         link
//       )
//     `
//     )
//     .eq("user_id", userId);

//   if (error) {
//     return error;
//   }

//   return data[0];
// };

export default GetUserProfile;
