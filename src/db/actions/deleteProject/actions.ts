"use server";

import DeleteWhatsappTracking from "@/db/actions/deleteWhatsappTracking/actions";
import { createServer } from "@/db/supabase/server";

const DeleteProject = async (projectToBeDeleted: any) => {
  const { id } = projectToBeDeleted;

  if (!id) return { status: 400 };

  const supabase = await createServer();

  const response = await supabase.from("projects").delete().eq("id", id);

  await DeleteWhatsappTracking(id);

  return response;
};

export default DeleteProject;
