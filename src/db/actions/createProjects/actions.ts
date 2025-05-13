"use server";

import GetUserProfile from "@/actions/getUserProfile/actions";
import createServer from "@/supabase/server";

const createCampaign = async ({ title }: { title: string }) => {
  const supabase = await createServer();

  const userData = await GetUserProfile();

  if (userData?.user_id) {
    const { error } = await supabase
      .from("campaigns")
      .insert({ title, user_id: userData?.user_id });
    if (error) {
      throw new Error("Error");
    }
  }

  return { status: 200 };
};

export default createCampaign;
