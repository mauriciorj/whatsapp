"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import { AlertBanner } from "@/components/ui/alert-banner";
import { WhatsAppNumbers } from "@/components/dashboard/whatsapp/numbers/whatsappNumbers";
import useTranslations from "@/hooks/useTranslations";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

const PhoneNumbersPage = () => {
  const searchParams = useSearchParams();
  const translate = useTranslations("Pages.Dashboard.PhoneNumbers");

  const [serverError, setServerError] = useState<boolean | null>(null);

  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  const { data: userCampaigns, refetch } = useQuery({
    queryKey: ["userCampaigns", campaignName],
    queryFn: async () => {
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
      {!campaignName ? (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7 text-center">
            {!campaignName ? translate["noCampaign"] : translate["noData"]}
          </div>
        </div>
      ) : (
        <>
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

export default PhoneNumbersPage;
