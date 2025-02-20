"use server";

import { createServer } from "@/db/supabase/server";
// import generateRandomCode from "@/lib/generateCode";
import { v4 as uuidv4 } from "uuid";

// const checkIfCodeExists = async (randomCodeToLink: string) => {
//   const supabase = await createServer();
//   const { data } = await supabase
//     .from("whatsapp")
//     .select()
//     .eq("link", randomCodeToLink);
//   return data;
// };

// const getUniqueCode = async () => {
//   let code: boolean | string = false;
//   while (code === false) {
//     const getCode = await generateRandomCode();
//     const check = await checkIfCodeExists(getCode);
//     if (!check?.length) code = getCode;
//   }
//   return code;
// };

// const whatsAppInsert = async ({
//   user_id,
//   link,
// }: {
//   user_id: string;
//   link: string;
// }) => {
//   const supabase = await createServer();
//   const { error } = await supabase.from("whatsapp").insert({ user_id, link });
//   return error;
// };

const userProfileUpdate = async ({
  first_name,
  last_name,
  plan,
  user_id,
  role,
  account_id,
}: {
  first_name: string;
  last_name: string;
  plan: string;
  user_id: string;
  role: string;
  account_id: string;
}) => {
  const supabase = await createServer();
  const { error } = await supabase
    .from("user_profile")
    .insert({
      first_name,
      last_name,
      plan,
      subscription_status: "not active",
      role,
      account_id,
    })
    .eq("user_id", user_id);
  return error;
};

const CreateUserAccount = async (formData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  plan: string;
}) => {
  const supabase = await createServer();

  const { email, firstName, lastName, password, plan } = formData;

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
  
  if (signUpData?.user?.id) {
    const profileUpdated = await userProfileUpdate({
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

  // As we are using Whatsapp inside the Project - the user first needs to create one project with a name
  // So this function will be moved to create Project's logic

  // Step 3 - If user was created correctly then generate the link, update user_profile and whatsapp tables
  // if (signUpData?.user?.id) {
  //   // Step 3.1 - Generate an unique random link
  //   const randomUniqueCode = await getUniqueCode();

  //   if (randomUniqueCode) {
  //     // Step 3.2 - Update the user_profile table with:
  //     // First Name, Last Name and Plan
  //     const profileUpdated = await userProfileUpdate({
  //       first_name: firstName,
  //       last_name: lastName,
  //       plan: plan,
  //       user_id: signUpData?.user?.id,
  //       // subscription_status: 'active',
  //       role: "admin",
  //       account_id: uuidv4(),
  //     });

  //     if (profileUpdated) {
  //       return { status: 500 };
  //     }

  //     // Step 3.3 - Insert in the whatsapp table:
  //     // user_id and link (random code)
  //     // const whatsAppUpdated = await whatsAppInsert({
  //     //   user_id: signUpData?.user?.id,
  //     //   link: randomUniqueCode,
  //     // });

  //     // if (whatsAppUpdated) {
  //     //   return { status: 500 };
  //     // }
  //   } else {
  //     return { status: 500 };
  //   }
  // }

  return { status: 200 };
};

export default CreateUserAccount;
