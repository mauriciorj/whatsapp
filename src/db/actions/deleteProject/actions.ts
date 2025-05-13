"use server";

import DeleteWhatsappTracking from "@/db/actions/deleteWhatsappTracking/actions";
import createServer from "@/db/supabase/server";

const deleteCampaign = async (campaignToBeDeleted: any) => {
  const { id } = campaignToBeDeleted;

  if (!id) return { status: 400 };

  const supabase = await createServer();

  const response = await supabase.from("campaigns").delete().eq("id", id);

  await DeleteWhatsappTracking(id);

  return response;
};

export default deleteCampaign;
