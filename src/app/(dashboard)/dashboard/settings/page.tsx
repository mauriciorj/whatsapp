"use client";

import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import ContentCard from "@/components/layout/contentCard";
import AlertBanner from "@/components/ui/alert-banner";
import CampaignSettingsForm from "@/features/campaigns/components/campaignSettingsForm";
import CampaignSettings from "@/features/campaigns/lib/campaignSettings";
import useTranslations from "@/hooks/useTranslations";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const translations = useTranslations("Pages.Dashboard.Settings");

  const { errorMessage, isLoading, form, formTranslation } = CampaignSettings();

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  const breadcrumbItems = [
    {
      href: "/dashboard/settings",
      label: "Configurações",
      icon: MessageCircle,
    },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={translations["pageTitle"]}
      pageDescription={translations["pageDescription"]}
    >
      <div className="container mb-10">
        <AlertBanner message={errorMessage} type="error" />
      </div>
      <ContentCard className="w-full max-w-lg px-10 pb-10">
        {!campaignName && !isLoading ? (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7 text-center">
              {!campaignName ? translations["noCampaign"] : null}
            </div>
          </div>
        ) : (
          <CampaignSettingsForm form={form} translations={formTranslation} />
        )}
      </ContentCard>
    </PageLayout>
  );
}
