"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import { AlertBanner } from "@/components/ui/alert-banner";
import WhatsAppLink from "@/components/dashboard/whatsapp/whatsappLink";
import WhatsAppMessage from "@/components/dashboard/whatsapp/whatsappMessage";
import { WhatsAppNumbers } from "@/components/dashboard/whatsapp/whatsappNumbers";
import useTranslations from "@/hooks/useTranslations";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

const WhatsAppPage = () => {
  const searchParams = useSearchParams();
  const translate = useTranslations("Pages.Dashboard.NumbersRotation");

  const [serverError, setServerError] = useState<boolean | null>(null);

  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  const {
    data: userCampaigns,
    isLoading: isUserCampaignsLoading,
    refetch,
  } = useQuery({
    queryKey: ["userCampaigns", campaignName],
    queryFn: async () => {
      // CLIENT SIDE
      const supabase = await createClient();

      const { data, error }: any = await supabase
        .from("campaigns")
        .select()
        .eq("user_id", userProfileData?.user_id)
        .eq("title", campaignName);

      if (error) {
        setServerError(true);
      }

      return data[0];
    },
    enabled: Boolean(!!userProfileData?.user_id && !!campaignName),
  }) as any;

  const breadcrumbItems = [
    { href: "/dashboard/whatsapp", label: "Whatsapp", icon: MessageCircle },
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
      {!campaignName ? (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7 text-center">
            {!campaignName ? translate["noCampaign"] : translate["noData"]}
          </div>
        </div>
      ) : (
        <>
          <WhatsAppLink
            isLoading={userProfileIsLoading || isUserCampaignsLoading}
            link={userCampaigns?.wp_link}
            campaignId={userCampaigns?.id}
            refetch={refetch}
          />
          <WhatsAppMessage
            isLoading={userProfileIsLoading || isUserCampaignsLoading}
            message={userCampaigns?.wp_message}
            campaignId={userCampaigns?.id}
          />
          <WhatsAppNumbers
            isLoading={userProfileIsLoading}
            numbers={userCampaigns?.wp_numbers}
            campaignId={userCampaigns?.id}
            refetch={refetch}
            userPlan={userProfileData?.plan}
          />
        </>
      )}
    </PageLayout>
  );
};

export default WhatsAppPage;
