"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import AuthCard from "@/components/auth/auth-card";
import PageLayout from "@/components/layout/pageLayout";
import Form from "@/components/form";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { PAGES, UPDATE_PASSWORD_REDIRECT_TO_URL } from "@/lib/constants";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

export default function ForgotPasswordPage() {
  const translate = useTranslations("Pages.RecoveryPassword");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form: any = useForm({
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
          setErrorMessage(translate["form"]["alertMessage"]);
        } else {
          setErrorMessage(null);
          setSuccessMessage(translate["form"]["successMessage"]);
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(translate["form"]["alertMessage"]);
      }
    },
  });

  const breadcrumbItems = [
    {
      href: PAGES.auth.recuperarSenha,
      label: translate["breadcrumbTitle"],
      icon: ShieldCheck,
    },
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      {errorMessage && <AlertBanner message={errorMessage} type="error" />}
      {successMessage && (
        <AlertBanner message={successMessage} type="success" />
      )}
      {!successMessage && (
        <AuthCard
          title={translate["cardTitle"]}
          description={translate["cardDescription"]}
        >
          <Form
            fieldsToRender={[
              {
                label: translate["form"]["fields"]["email"]["label"],
                name: translate["form"]["fields"]["email"]["name"],
                placeholder:
                  translate["form"]["fields"]["email"]["placeholder"],
                type: "email",
              },
            ]}
            forgotPasswordLabel={translate["form"]["forgotPasswordLabel"]}
            form={form}
            makeLoginLabel={translate["form"]["makeLoginLabel"]}
            submitLabel={translate["form"]["submitLabel"]}
            submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
          />
        </AuthCard>
      )}
    </PageLayout>
  );
}
