"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import createClient from "@/db/supabase/client";
import useTranslations from "@/hooks/useTranslations";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

const UpdateAccount = () => {
  const router = useRouter();
  const translations = useTranslations("Features.UpdateAccountForm");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const UserLogout = async() => {
    const supabase = createClient();
  
    const { error } = await supabase.auth.signOut();
  
    if (!error) {
      router.refresh();
    }
  };

  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onSubmit: updatePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const supabase = await createClient();
        const { error } = await supabase.auth.updateUser({
          password: value?.password,
        });
        if (error) {
          setErrorMessage(translations["alertMessage"]);
        } else {
          setErrorMessage(null);
          UserLogout();
        }
      } catch {
        setErrorMessage(translations["alertMessage"]);
      }
    },
  });

  return {
    errorMessage,
    form,
    translations,
  };
};

export default UpdateAccount;
