"use client";

import { ShieldCheck } from "lucide-react";
import PageLayout from "@/components/layout/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import AuthCard from "@/features/user/components/authCard";
import RecoveryAccountForm from "@/features/user/components/recoveryAccountForm";
import RecoveryAccount from "@/features/user/lib/recoveryAccount";
import useTranslations from "@/hooks/useTranslations";
import { PAGES } from "@/lib/constants";

export default function ForgotPasswordPage() {
  const translations = useTranslations("Pages.RecoveryPassword");

  const {
    errorMessage,
    form,
    translations: recoveryAccountTranslations,
    successMessage,
  } = RecoveryAccount();

  const breadcrumbItems = [
    {
      href: PAGES.auth.recuperarSenha,
      label: translations["breadcrumbTitle"],
      icon: ShieldCheck,
    },
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <AlertBanner message={errorMessage} type="error" />
      <AlertBanner message={successMessage} type="success" />
      {!successMessage && (
        <AuthCard
          title={translations["cardTitle"]}
          description={translations["cardDescription"]}
        >
          <RecoveryAccountForm
            form={form}
            translations={recoveryAccountTranslations}
          />
        </AuthCard>
      )}
    </PageLayout>
  );
}
