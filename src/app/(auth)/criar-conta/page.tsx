"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import AuthCard from "@/components/auth/auth-card";
import Form from "@/components/form";
import PageLayout from "@/components/layout/pageLayout";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import BusinessRules from "@/lib/businessRules";
import { PAGES } from "@/lib/constants";
import { signupSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

export default function CriarConta() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const translate = useTranslations("Pages.CreateAccount");

  const getPlano = searchParams.get("plano") as string;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
        setErrorMessage(translate["form"]["alertMessage"]);
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
        setErrorMessage(translate["form"]["alertMessageEmailExists"]);
        return scrollToTop();
      }

      // Step 2 - Create account
      // Supabase will add the id and email to user_profile table
      const { data: signUpData, error } = await supabase.auth.signUp(data);

      if (error) {
        setSuccessMessage(null);
        setErrorMessage(translate["form"]["alertMessage"]);
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
          setErrorMessage(translate["form"]["alertMessage"]);
          return scrollToTop();
        }
      }
      if (BusinessRules[getPlano]?.url) {
        setErrorMessage(null);
        setSuccessMessage(translate["form"]["successMessage"]);
        scrollToTop();
        return router.push(BusinessRules[getPlano]?.url);
      }
    },
  });
  const breadcrumbItems = [
    {
      href: `${PAGES.auth.criarConta}?plano=${getPlano}`,
      label: translate["breadcrumbTitle"],
      icon: UserPlus,
    },
  ];
  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      {errorMessage && <AlertBanner message={errorMessage} type="error" />}
      {successMessage && (
        <AlertBanner message={successMessage} type="success" />
      )}
      <AuthCard
        title={translate["cardTitle"]}
        description={translate["cardDescription"]}
      >
        <Form
          createAccountLinkLabel={translate["form"]["createAccountLinkLabel"]}
          fieldsToRender={[
            {
              label: translate["form"]["fields"]["firstName"]["label"],
              name: translate["form"]["fields"]["firstName"]["name"],
              placeholder:
                translate["form"]["fields"]["firstName"]["placeholder"],
              type: "text",
            },
            {
              label: translate["form"]["fields"]["lastName"]["label"],
              name: translate["form"]["fields"]["lastName"]["name"],
              placeholder:
                translate["form"]["fields"]["lastName"]["placeholder"],
              type: "text",
            },
            {
              label: translate["form"]["fields"]["email"]["label"],
              name: translate["form"]["fields"]["email"]["name"],
              placeholder: translate["form"]["fields"]["email"]["placeholder"],
              type: "email",
            },
            {
              label: translate["form"]["fields"]["password"]["label"],
              name: translate["form"]["fields"]["password"]["name"],
              type: "password",
            },
            {
              disabled: true,
              label: translate["form"]["fields"]["plan"]["label"],
              name: translate["form"]["fields"]["plan"]["name"],
              type: "text",
            },
          ]}
          forgotPasswordLabel={translate["form"]["forgotPasswordLabel"]}
          form={form}
          makeLoginLabel={translate["makeLoginLabel"]}
          showPasswordRules
          submitLabel={translate["form"]["submitLabel"]}
          submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
        />
      </AuthCard>
    </PageLayout>
  );
}
