"use server";

import createServer from "@/supabase/server";

const getWhatsappTracking = async ({
  userId,
  period,
}: {
  userId?: string;
  period: number;
}) => {
  if (!userId) return null;

  const supabase = await createServer();

  const timeTemp = new Date(
    new Date().setDate(new Date().getDate() - period)
  ).toISOString();

  const { data, error } = await supabase
    .from("whatsapp_tracking")
    .select("created_at, country, city, device_size, device_system", {
      count: "exact",
    })
    .eq("user_id", userId)
    .gte("created_at", timeTemp)
    .order("created_at", { ascending: true });

  if (error) {
    return error;
  }

  return data;
};

export default getWhatsappTracking;
