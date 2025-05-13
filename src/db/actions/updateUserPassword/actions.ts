'use server';

import createServer from '@/db/supabase/server';

const UpdateUserPassword = async (formData: { password: string }) => {
  const supabase = await createServer();

  const { password } = formData;

  const { error } = await supabase.auth.updateUser({ password: password });

  if (error) {
    return false;
  }

  return true;
};

export default UpdateUserPassword;
