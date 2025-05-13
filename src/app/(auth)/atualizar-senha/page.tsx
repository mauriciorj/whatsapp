"use client";

import { ShieldCheck } from "lucide-react";
import PageLayout from "@/components/layout/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import AuthCard from "@/features/user/components/authCard";
import UpdateAccountForm from "@/features/user/components/updateAccountForm";
import updateAccount from "@/features/user/lib/updateAccount";
import useTranslations from "@/hooks/useTranslations";
import { PAGES } from "@/lib/constants";

export default function ResetPassword() {
  const translations = useTranslations("Pages.UpdatePassword");

  const {
    errorMessage,
    form,
    translations: updateAccountTranslations,
  } = updateAccount();

  const breadcrumbItems = [
    {
      href: PAGES.auth.atualizarSenha,
      label: translations["breadcrumbTitle"],
      icon: ShieldCheck,
    },
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <AlertBanner message={errorMessage} type="error" />
      <AuthCard
        title={translations["cardTitle"]}
        description={translations["cardDescription"]}
      >
        <UpdateAccountForm
          form={form}
          translations={updateAccountTranslations}
        />
      </AuthCard>
    </PageLayout>
  );
}
