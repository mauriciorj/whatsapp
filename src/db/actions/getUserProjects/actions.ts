"use server";

import { createServer } from "@/supabase/server";

const GetUserProjects = async ({ userId }: { userId?: string }) => {
  if (!userId) return null;

  const supabase = await createServer();

  const { data, error }: any = await supabase
    .from("projects")
    .select("title")
    .eq("user_id", userId);

  if (error) {
    return error;
  }

  return data?.sort((a: any, b: any) => a.title.localeCompare(b.title)) || [];
};

export default GetUserProjects;
