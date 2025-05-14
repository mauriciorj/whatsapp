"use client";

import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import WhatsAppNumbers from "@/features/whatsapp/phoneNumbers/components/whatsappNumbers";
import useWhatsapp from "@/features/whatsapp/hooks/useWhatsapp";
import GetUserProfile from "@/features/user/lib/getUserProfile";
import useTranslations from "@/hooks/useTranslations";

export default function PhoneNumbersPage() {
  const searchParams = useSearchParams();
  const translations = useTranslations("Pages.Dashboard.PhoneNumbers");

  const { userProfileIsLoading } = GetUserProfile();

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  const {
    currentCampaign,
    data: whatsapps,
    errorMessage,
    isLoading: isWhatsappLoading,
  } = useWhatsapp();

  const breadcrumbItems = [
    {
      href: "/dashboard/phoneNumbers",
      label: "Números Conectados",
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

      {!campaignName ? (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7 text-center">
            {!campaignName ? translations["noCampaign"] : null}
          </div>
        </div>
      ) : (
        <>
          <WhatsAppNumbers
            // addPhoneNameForm={addPhoneNameForm}
            campaignId={currentCampaign?.id}
            isLoading={userProfileIsLoading || isWhatsappLoading}
            whatsapps={whatsapps}
            // refetch={refetch}
            // userPlan={l?.plan}
          />
        </>
      )}
    </PageLayout>
  );
}
