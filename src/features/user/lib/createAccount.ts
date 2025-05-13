"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import createClient from "@/db/supabase/client";
import useTranslations from "@/hooks/useTranslations";
import BusinessRules from "@/lib/businessRules";
import { signupSchema } from "@/lib/validations/schemas";
import { scrollToTop } from "@/lib/scroll";
import { useForm } from "@tanstack/react-form";

const createAccount = () => {
  const router = useRouter();
  const translations = useTranslations("Features.CreateAccountForm");

  const searchParams = useSearchParams();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getPlano = searchParams.get("plano") as string;

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      plan: getPlano
        ? `${BusinessRules[getPlano]?.name} - R$${BusinessRules[getPlano]?.price}`
        : null,
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }: any) => {
      setErrorMessage(null);
      setSuccessMessage(null);

      const supabase = await createClient();

      if (!Object.keys(BusinessRules).some((plan) => plan === getPlano)) {
        setSuccessMessage(null);
        setErrorMessage(formTranslation["form"]["alertMessage"]);
        return scrollToTop();
      }

      const data = {
        email: value.email.toLowerCase(),
        password: value.password,
      };

      // Step 1 - Check if account doesn't exist
      const { data: hasUser } = await supabase
        .from("user_profile")
        .select("email")
        .eq("email", value.email);

      if (hasUser && hasUser[0]?.email) {
        setSuccessMessage(null);
        setErrorMessage(formTranslation["form"]["alertMessageEmailExists"]);
        return scrollToTop();
      }

      // Step 2 - Create account
      // Supabase will add the id and email to user_profile table
      const { data: signUpData, error } = await supabase.auth.signUp(data);

      if (error) {
        setSuccessMessage(null);
        setErrorMessage(formTranslation["form"]["alertMessage"]);
        return scrollToTop();
      }

      // Step 3 - Update account after create it
      if (signUpData?.user?.id) {
        const { error } = await supabase
          .from("user_profile")
          .update({
            country: "Brasil",
            first_name: value.firstName,
            last_name: value.lastName,
            plan: getPlano,
            user_id: signUpData?.user?.id,
            role: "accountAdmin",
            account_id: uuidv4(),
          })
          .eq("user_id", signUpData?.user?.id);
        if (error) {
          setSuccessMessage(null);
          setErrorMessage(formTranslation["form"]["alertMessage"]);
          return scrollToTop();
        }
      }
      if (BusinessRules[getPlano]?.url) {
        setErrorMessage(null);
        setSuccessMessage(formTranslation["form"]["successMessage"]);
        scrollToTop();
        return router.push(BusinessRules[getPlano]?.url);
      }
    },
  });

  return { form, errorMessage, translations, successMessage };
};

export default createAccount;
