"use server";

import createServer from "@/db/supabase/server";

const DeleteWhatsappTracking = async (id: string) => {
  const supabase = await createServer();
  
  const response = await supabase
  .from('whatsapp_tracking')
  .delete()
  .eq('campaign_id', id)

  return response

};

export default DeleteWhatsappTracking;
