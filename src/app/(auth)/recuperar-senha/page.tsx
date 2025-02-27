"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
// import ResetPasswordForEmail from "@/actions/resetPasswordForEmail/actions";
import AuthCard from "@/components/auth/auth-card";
import PageLayout from "@/components/layout/pageLayout";
import Form from "@/components/form";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

export default function ForgotPasswordPage() {
  const translate = useTranslations("Pages.RecoveryPassword");

  const [serverError, setServerError] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean | null>(false);

  const form: any = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }: any) => {
      try {
        // CLIENT SIDE
        const supabase = await createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(
          value.email.toLowerCase(),
          {
            redirectTo: `https://www.zaprouter.pro/atualizar-senha`,
          }
        );
        if (error) {
          setServerError(true);
        } else {
          setSuccessMessage(true);
        }

        // SERVER SIDE
        // const response = await ResetPasswordForEmail({
        //   email: value.email,
        //   redirectToUrl: `https://www.zaprouter.pro/atualizar-senha`,
        // });
        // if (response === false) {
        //   setServerError(true);
        // } else {
        //   setSuccessMessage(true);
        // }
      } catch {
        setServerError(true);
      }
    },
  });

  const breadcrumbItems = [
    { href: "/recuperar-senha", label: "Recuperar Senha", icon: ShieldCheck },
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      {serverError && (
        <AlertBanner message={translate["form"]["alertMessage"]} type="error" />
      )}
      {successMessage && (
        <AlertBanner
          message={translate["form"]["successMessage"]}
          type="success"
        />
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
