"use client";

import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";

export default function WhatsAppPage() {
  const searchParams = useSearchParams();
  const translations = useTranslations("Pages.Dashboard.Whatsapp");

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  const breadcrumbItems = [
    { href: "/dashboard/whatsapp", label: "Whatsapp", icon: MessageCircle },
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
      {!campaignName ? (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7 text-center">
            {!campaignName
              ? translations["noCampaign"]
              : translations["noData"]}
          </div>
        </div>
      ) : (
        <>Visão Geral</>
      )}
    </PageLayout>
  );
}
