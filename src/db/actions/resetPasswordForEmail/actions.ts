"use server";

import createServer from "@/db/supabase/server";

const ResetPasswordForEmail = async ({
  email,
  redirectToUrl,
}: {
  email: string;
  redirectToUrl: string;
}) => {
  const supabase = await createServer();

  const { error } = await supabase.auth.resetPasswordForEmail(
    email.toLowerCase(),
    {
      redirectTo: redirectToUrl,
    }
  );

  if (error) {
    return false;
  }

  return true;
};

export default ResetPasswordForEmail;
