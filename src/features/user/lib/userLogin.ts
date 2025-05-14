"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import createClient from "@/db/supabase/client";
import useTranslations from "@/hooks/useTranslations";
import { PAGES } from "@/lib/constants";
import { loginSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

const UserLogin = () => {
  const router = useRouter();
  const translations = useTranslations("Features.LoginForm");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }: any) => {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: value?.email,
        password: value?.password,
      });
      if (error) {
        setErrorMessage(translations["form"]["alertMessage"]);
      } else {
        setErrorMessage(null);
        router.refresh();
        redirect(PAGES.dashboard.dashboard);
      }
    },
  });

  return {
    errorMessage,
    form,
    translations,
  };
};

export default UserLogin;
