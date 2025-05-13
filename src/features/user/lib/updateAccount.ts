"use client";

import { useState } from "react";
import userLogout from "./userLogout";
import createClient from "@/db/supabase/client";
import useTranslations from "@/hooks/useTranslations";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

const updateAccount = () => {
  const translations = useTranslations("Features.UpdateAccountForm");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          userLogout();
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

export default updateAccount;
