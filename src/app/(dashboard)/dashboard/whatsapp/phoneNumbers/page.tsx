"use client";

import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import { AlertBanner } from "@/components/ui/alert-banner";
import { WhatsAppNumbers } from "@/components/dashboard/whatsapp/numbers/whatsappNumbers";
import useTranslations from "@/hooks/useTranslations";
import { useWhatsapp } from "@/hooks/useWhatsapp";
import { useQuery } from "@tanstack/react-query";

const PhoneNumbersPage = () => {
  const searchParams = useSearchParams();
  const translate = useTranslations("Pages.Dashboard.PhoneNumbers");

  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  const {
    addPhoneNameForm,
    campaignId,
    data: whatsapps,
    errorMessage,
    isLoading: isWhatsappLoading,
    refetch,
    serverError,
  } = useWhatsapp({ campaignName, translate });

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
      pageTitle={translate["pageTitle"]}
      pageDescription={translate["pageDescription"]}
    >
      {serverError && (
        <div className="container mb-10">
          <AlertBanner message={translate["alertMessage"]} type="error" />
        </div>
      )}
      {errorMessage && (
        <div className="container mb-10">
          <AlertBanner message={errorMessage} type="error" />
        </div>
      )}
      {!campaignName ? (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7 text-center">
            {!campaignName ? translate["noCampaign"] : null}
          </div>
        </div>
      ) : (
        <>
          <WhatsAppNumbers
            addPhoneNameForm={addPhoneNameForm}
            campaignId={campaignId}
            isLoading={userProfileIsLoading || isWhatsappLoading}
            whatsapps={whatsapps}
            refetch={refetch}
            userPlan={userProfileData?.plan}
          />
        </>
      )}
    </PageLayout>
  );
};

export default PhoneNumbersPage;
