"use client";

import { Mail } from "lucide-react";
import useTranslations from "@/hooks/useTranslations";
import PageLayout from "@/components/layout/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import ContactForm from "@/features/contact/components/contactForm";
import postMessage from "@/features/contact/lib/postMessage";
import AuthCard from "@/features/user/components/authCard";

export default function Contato() {
  const translations = useTranslations("Pages.Contact");

  const {
    translations: postMessageTranslation,
    errorMessage,
    form,
    successMessage,
  } = postMessage();

  const breadcrumbItems = [{ href: "/contato", label: "Contato", icon: Mail }];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <AuthCard title={translations["cardTitle"]}>
        <AlertBanner message={errorMessage} type="error" />
        <AlertBanner message={successMessage} type="error" />
        {!successMessage && (
          <div>
            <ContactForm form={form} translations={postMessageTranslation} />
          </div>
        )}
      </AuthCard>
    </PageLayout>
  );
}
