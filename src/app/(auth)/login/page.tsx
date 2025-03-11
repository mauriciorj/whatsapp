"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import AuthCard from "@/components/auth/auth-card";
import PageLayout from "@/components/layout/pageLayout";
import Form from "@/components/form";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { PAGES } from "@/lib/constants";
import { loginSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

export default function Login() {
  const router = useRouter();
  const translate = useTranslations("Pages.Login");

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
        setErrorMessage(translate["form"]["alertMessage"]);
      } else {
        setErrorMessage(null);
        router.refresh();
        redirect(PAGES.dashboard.dashboard);
      }
    },
  });

  const breadcrumbItems = [
    {
      href: PAGES.auth.login,
      label: translate["breadcrumbTitle"],
      icon: KeyRound,
    },
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      {errorMessage && <AlertBanner message={errorMessage} type="error" />}
      <AuthCard
        title={translate["cardTitle"]}
        description={translate["cardDescription"]}
      >
        <Form
          createAccountLinkLabel={translate["form"]["createAccountLinkLabel"]}
          fieldsToRender={[
            {
              label: translate["form"]["fields"]["email"]["label"],
              name: translate["form"]["fields"]["email"]["name"],
              type: "email",
            },
            {
              label: translate["form"]["fields"]["password"]["label"],
              name: translate["form"]["fields"]["password"]["name"],
              type: "password",
            },
          ]}
          forgotPasswordLabel={translate["form"]["forgotPasswordLabel"]}
          form={form}
          submitLabel={translate["form"]["submitLabel"]}
          submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
        />
      </AuthCard>
    </PageLayout>
  );
}
