"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
// import UpdateUserPassword from "@/actions/updateUserPassword/actions";
import AuthCard from "@/components/auth/auth-card";
import PageLayout from "@/components/layout/pageLayout";
import Form from "@/components/form";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { updatePasswordSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

export default function ResetPassword() {
  const router = useRouter();
  const translate = useTranslations("Pages.UpdatePassword");

  const [serverError, setServerError] = useState<boolean | null>(null);

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
        // CLIENT SIDE
        const supabase = await createClient();
        const { error } = await supabase.auth.updateUser({
          password: value?.password,
        });
        if (error) {
          setServerError(true);
        } else {
          handleSignOut();
        }

        // SERVER SIDE
        // const response = await UpdateUserPassword(
        //   value as { password: string }
        // );
        // if (response === false) {
        //   setServerError(true);
        // } else {
        //   handleSignOut();
        // }
      } catch {
        setServerError(true);
      }
    },
  });

  const breadcrumbItems = [
    { href: "/atualizar-senha", label: "Atualizar Senha", icon: ShieldCheck },
  ];

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
