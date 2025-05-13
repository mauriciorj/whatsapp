"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import WhatsappGroups from "@/features/whatsapp/components/groups/whatsappGroups";

export default function GroupsPage() {
  const translations = useTranslations("Pages.Dashboard.Groups");

  const [serverError, setServerError] = useState<boolean | null>(null);

  const breadcrumbItems = [
    { href: "/dashboard/groups", label: "Grupos", icon: MessageCircle },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={translations["pageTitle"]}
      pageDescription={translations["pageDescription"]}
    >
      <div className="container mb-10">
        <AlertBanner message={translations["alertMessage"]} type="error" />
      </div>
      <WhatsappGroups />
    </PageLayout>
  );
}
