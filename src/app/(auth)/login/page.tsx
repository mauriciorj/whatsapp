"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
// import LoginUser from "@/actions/login/actions";
import AuthCard from "@/components/auth/auth-card";
import PageLayout from "@/components/layout/pageLayout";
import Form from "@/components/form";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { loginSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

export default function Login() {
  const router = useRouter();
  const translate = useTranslations("Pages.Login");

  const [serverError, setServerError] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }: any) => {
      // CLIENT SIDE
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: value?.email,
        password: value?.password,
      });
      if (error) {
        setServerError(true);
      } else {
        router.refresh();
        redirect("/dashboard");
      }

      // SERVER SIDE
      // const response = await LoginUser(
      //   value as { email: string; password: string }
      // );
      // if (response === false) {
      //   setServerError(true);
      // }
    },
  });

  const breadcrumbItems = [{ href: "/login", label: "Login", icon: KeyRound }];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      {serverError && (
        <AlertBanner message={translate["form"]["alertMessage"]} type="error" />
      )}
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
