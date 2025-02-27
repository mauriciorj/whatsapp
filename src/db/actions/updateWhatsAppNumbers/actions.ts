"use server";

import { createServer } from "@/supabase/server";

type WhatsAppEntry = {
  number: string;
  message: string;
}[];

const UpdateWhatsAppNumbers = async ({
  entries,
  user_id,
}: {
  entries: WhatsAppEntry;
  user_id: string;
}) => {
  const supabase = await createServer();

  const { error }: any = await supabase
    .from("whatsapp")
    .update({numbers: entries})
    .eq("user_id", user_id);

  return error;
};

export default UpdateWhatsAppNumbers;
