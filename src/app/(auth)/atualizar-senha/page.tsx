"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import AuthCard from "@/components/auth/auth-card";
import PageLayout from "@/components/layout/pageLayout";
import Form from "@/components/form";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { PAGES } from "@/lib/constants";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

export default function ResetPassword() {
  const router = useRouter();
  const translate = useTranslations("Pages.UpdatePassword");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
    }
  };

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
          setErrorMessage(translate["form"]["alertMessage"]);
        } else {
          setErrorMessage(null);
          handleSignOut();
        }
      } catch {
        setErrorMessage(translate["form"]["alertMessage"]);
      }
    },
  });

  const breadcrumbItems = [
    {
      href: PAGES.auth.atualizarSenha,
      label: translate["form"]["breadcrumbTitle"],
      icon: ShieldCheck,
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
              label: translate["form"]["fields"]["password"]["label"],
              name: translate["form"]["fields"]["password"]["name"],
              type: "password",
            },
          ]}
          forgotPasswordLabel={translate["form"]["forgotPasswordLabel"]}
          form={form}
          showPasswordRules
          submitLabel={translate["form"]["submitLabel"]}
          submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
        />
      </AuthCard>
    </PageLayout>
  );
}
