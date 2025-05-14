"use client";

import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import AlertBanner from "@/components/ui/alert-banner";
import GetCampaigns from "@/features/campaigns/lib/getCampaigns";
// import WhatsAppNumbers from "@/features/whatsapp/components/numbers/whatsappNumbers";
import WhatsAppLink from "@/features/whatsapp/link/components/whatsappLink";
import GetUserProfile from "@/features/user/lib/getUserProfile";
import useTranslations from "@/hooks/useTranslations";

export default function WhatsAppPage() {
  const searchParams = useSearchParams();
  const translations = useTranslations("Pages.Dashboard.Whatsapp");

  const { userProfileIsLoading } = GetUserProfile();

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  const {
    data: userCampaigns,
    isLoading: isUserCampaignsLoading,
  } = GetCampaigns();

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
        <>
          <WhatsAppLink
            isLoading={userProfileIsLoading || isUserCampaignsLoading}
            link={userCampaigns[0]?.wp_link}
            // refetch={refetch}
          />
          {/* <WhatsAppNumbers
            campaignId={userCampaigns?.id}
            isLoading={userProfileIsLoading}
            numbers={userCampaigns?.wp_numbers}
            refetch={refetch}
            userPlan={userProfile?.plan}
          /> */}
        </>
      )}
    </PageLayout>
  );
}
