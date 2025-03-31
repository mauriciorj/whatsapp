"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import WhatsappGroups from "@/components/dashboard/whatsapp/groups/whatsappGroups";

const GroupsPage = () => {
  const translate = useTranslations("Pages.Dashboard.Groups");

  const [serverError, setServerError] = useState<boolean | null>(null);

  const breadcrumbItems = [
    { href: "/dashboard/groups", label: "Grupos", icon: MessageCircle },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={translate["pageTitle"]}
      pageDescription={translate["pageDescription"]}
    >
      {serverError && (
        <div className="container mb-10">
          <AlertBanner message={translate["alertMessage"]} type="error" />
        </div>
      )}
      <WhatsappGroups />
    </PageLayout>
  );
};

export default GroupsPage;
