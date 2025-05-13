"use client";

import { KeyRound } from "lucide-react";
import AuthCard from "@/features/user/components/authCard";
import PageLayout from "@/components/layout/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import UserLoginForm from "@/features/user/components/userLoginForm";
import useTranslations from "@/hooks/useTranslations";
import userLogin from "@/features/user/lib/userLogin";
import { PAGES } from "@/lib/constants";

export default function Login() {
  const translations = useTranslations("Pages.Login");

  const {
    errorMessage,
    form,
    translations: translationsUserLogin,
  } = userLogin();

  const breadcrumbItems = [
    {
      href: PAGES.auth.login,
      label: translations["breadcrumbTitle"],
      icon: KeyRound,
    },
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <AlertBanner message={errorMessage} type="error" />
      <AuthCard
        title={translations["cardTitle"]}
        description={translations["cardDescription"]}
      >
        <UserLoginForm form={form} translations={translationsUserLogin} />
      </AuthCard>
    </PageLayout>
  );
}
