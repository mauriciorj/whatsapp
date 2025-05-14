"use client";

import { useState } from "react";
import createClient from "@/db/supabase/client";
import useTranslations from "@/hooks/useTranslations";
import { UPDATE_PASSWORD_REDIRECT_TO_URL } from "@/lib/constants";
import { useForm } from "@tanstack/react-form";

const RecoveryAccount = () => {
  const translations = useTranslations("Features.RecoveryPasswordForm");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }: any) => {
      try {
        const supabase = await createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(
          value.email.toLowerCase(),
          {
            redirectTo: UPDATE_PASSWORD_REDIRECT_TO_URL,
          }
        );
        if (error) {
          setSuccessMessage(null);
          setErrorMessage(translations["form"]["alertMessage"]);
        } else {
          setErrorMessage(null);
          setSuccessMessage(translations["form"]["successMessage"]);
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(translations["form"]["alertMessage"]);
      }
    },
  });

  return {
    errorMessage,
    form,
    translations,
    successMessage,
  };
};

export default RecoveryAccount;
