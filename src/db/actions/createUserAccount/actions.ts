"use server";

import UpdateUserProfile from "@/actions/updateUserProfile/actions";
import createServer from "@/supabase/server";
import { redirect } from "next/navigation";
import BusinessRules from "@/lib/businessRules";
import { v4 as uuidv4 } from "uuid";

const CreateUserAccount = async (formData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  plan: string;
}) => {
  const supabase = await createServer();

  const { email, firstName, lastName, password, plan } = formData;

  if (!Object.values(BusinessRules).some((item) => item.name === plan)) {
    return { status: 500 };
  }

  const data = {
    email: email.toLowerCase(),
    password,
  };

  // Step 1 - Check if account doesn't exist
  const { data: hasUser } = await supabase
    .from("user_profile")
    .select("email")
    .eq("email", email);

  if (hasUser && hasUser[0]?.email) {
    return { status: 400 };
  }

  // Step 2 - Create account
  // Supabase will add the id and email to user_profile table
  const { data: signUpData, error } = await supabase.auth.signUp(data);

  if (error) {
    return { status: 500 };
  }

  // Step 3 - Update account after create it
  if (signUpData?.user?.id) {
    const profileUpdated = await UpdateUserProfile({
      first_name: firstName,
      last_name: lastName,
      plan: plan,
      user_id: signUpData?.user?.id,
      role: "admin",
      account_id: uuidv4(),
    });

    if (profileUpdated) {
      return { status: 500 };
    }
  }

  if (plan === "basico") {
    redirect("https://pay.kiwify.com.br/vNY2XvG");
  } else if (plan === "avancado") {
    redirect("https://pay.kiwify.com.br/tA9jJEx");
  } else {
    return { status: 500 };
  }
};

export default CreateUserAccount;
