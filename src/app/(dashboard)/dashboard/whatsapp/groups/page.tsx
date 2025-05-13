"use client";

import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import WhatsappGroups from "@/features/whatsapp/components/groups/whatsappGroups";
import useTranslations from "@/hooks/useTranslations";

export default function GroupsPage() {
  const translations = useTranslations("Pages.Dashboard.Groups");

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
