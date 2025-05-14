"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ResetPasswordForEmail from "@/actions/resetPasswordForEmail/actions";
import UpdateUserPassword from "@/actions/updateUserPassword/actions";
import GetUserProfile from "@/features/user/lib/getUserProfile";
import useTranslations from "@/hooks/useTranslations";
import { RESET_PASSWORD_REDIRECT_TO_URL } from "@/lib/constants";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import createClient from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

const UpdateUserProfile = () => {
  const formTranslation = useTranslations("Features.ResetPasswordForm");

  const router = useRouter();

  const { userProfile, userProfileIsLoading } = GetUserProfile();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const userhHandleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
    }
  };

  const mutation = useMutation({
    mutationFn: () =>
      ResetPasswordForEmail({
        email: userProfile?.email,
        redirectToUrl: RESET_PASSWORD_REDIRECT_TO_URL,
      } as any),
    onError: () => {
      setSuccessMessage(null);
      setErrorMessage(formTranslation["ResetPasswordForm"]["alertMessage"]);
    },
    onSuccess: () => {
      setErrorMessage(null);
      setSuccessMessage(formTranslation["ResetPasswordForm"]["successMessage"]);
    },
  });

  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onSubmit: updatePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        // SERVER SIDE
        const response = await UpdateUserPassword(
          value as { password: string }
        );
        if (response === false) {
          setSuccessMessage(null);
          setErrorMessage(formTranslation["ResetPasswordForm"]["alertMessage"]);
        } else {
          setErrorMessage(null);
          setSuccessMessage(formTranslation["ResetPasswordForm"]["successMessage"]);
          userhHandleSignOut();
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(formTranslation["ResetPasswordForm"]["alertMessage"]);
      }
    },
  });

  return {
    errorMessage,
    form,
    formTranslation,
    isLoading: userProfileIsLoading,
    mutation,
    successMessage,
  };
};

export default UpdateUserProfile;
