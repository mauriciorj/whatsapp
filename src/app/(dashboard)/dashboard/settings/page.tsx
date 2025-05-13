"use client";

import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import Form from "@/components/form";
import useTranslations from "@/hooks/useTranslations";
import ContentCard from "@/components/layout/contentCard";
import campaignSettings from "@/features/campaigns/lib/campaignSettings";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const translations = useTranslations("Pages.Dashboard.Settings");

  const { errorMessage, isLoading, form, formTranslation } = campaignSettings();

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
          <Form
            fieldsToRender={[
              {
                label: formTranslation["fields"]["campaignName"]["label"],
                name: formTranslation["fields"]["campaignName"]["name"],
                type: "text",
              },
              {
                label:
                  formTranslation["fields"]["campaignDescription"]["label"],
                name: formTranslation["fields"]["campaignDescription"]["name"],
                type: "text",
              },
              {
                label: formTranslation["fields"]["startDate"]["label"],
                name: formTranslation["fields"]["startDate"]["name"],
                type: "text",
              },
              {
                label: formTranslation["fields"]["endDate"]["label"],
                name: formTranslation["fields"]["endDate"]["name"],
                type: "text",
              },
              {
                label: formTranslation["fields"]["leadsPerGroup"]["label"],
                name: formTranslation["fields"]["leadsPerGroup"]["name"],
                type: "text",
              },
              {
                label: formTranslation["fields"]["sameLeadsInGroups"]["label"],
                name: formTranslation["fields"]["sameLeadsInGroups"]["name"],
                type: "text",
              },
              {
                label: formTranslation["fields"]["redirectLink"]["label"],
                name: formTranslation["fields"]["redirectLink"]["name"],
                type: "text",
              },
            ]}
            form={form}
            submitLabel="Salvar"
            submitLoadingLabel="Salvando..."
          />
        )}
      </ContentCard>
    </PageLayout>
  );
}
