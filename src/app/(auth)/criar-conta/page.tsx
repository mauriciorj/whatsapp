"use client";

import { useSearchParams } from "next/navigation";
import { UserPlus } from "lucide-react";
import PageLayout from "@/components/layout/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import AuthCard from "@/features/user/components/authCard";
import CreateAccountForm from "@/features/user/components/createAccountForm";
import createAccount from "@/features/user/lib/createAccount";
import useTranslations from "@/hooks/useTranslations";
import { PAGES } from "@/lib/constants";

export default function CriarConta() {
  const searchParams = useSearchParams();
  const translations = useTranslations("Pages.CreateAccount");

  const {
    errorMessage,
    form,
    translations: createAccountTranslations,
    successMessage,
  } = createAccount();

  const getPlano = searchParams.get("plano") as string;

  const breadcrumbItems = [
    {
      href: `${PAGES.auth.criarConta}?plano=${getPlano}`,
      label: translations["breadcrumbTitle"],
      icon: UserPlus,
    },
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <AlertBanner message={errorMessage} type="error" />
      <AlertBanner message={successMessage} type="success" />
      <AuthCard
        title={translations["cardTitle"]}
        description={translations["cardDescription"]}
      >
        <CreateAccountForm
          form={form}
          translations={createAccountTranslations}
        />
      </AuthCard>
    </PageLayout>
  );
}
