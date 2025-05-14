import { useSearchParams } from "next/navigation";
import { useState } from "react";
import GetCampaigns from "@/features/campaigns/lib/getCampaigns";
import GetUserProfile from "@/features/user/lib/getUserProfile";
import createClient from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

type whatsappTable = {
  id: string;
  name: string;
  status: string;
};

const GetWhatsapp = () => {
  const searchParams = useSearchParams();
  const campaignName = searchParams?.get("campaign") || null;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { userProfile, userProfileIsLoading } = GetUserProfile();

  const { data: campaigns, isLoading: isLoadingGetCampaigns } = GetCampaigns();

  const getCurrentCampaign = campaigns?.find(
    (campaign: any) => campaign.title === campaignName
  );

  const {
    data,
    isLoading: getWhatsappIsLoading,
    refetch,
  } = useQuery<any>({
    queryKey: ["whatsappNumbers", getCurrentCampaign?.id],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("whatsapp")
        .select("id, name, status")
        .eq("campaign_id", getCurrentCampaign?.id);

      if (error) {
        setErrorMessage(
          "Ops... algo deu errado. Tente novamente mais tarde ou entre em contato com o nosso suporte"
        );
      }

      return data || [];
    },
    enabled: Boolean(
      !!userProfile?.user_id && !!campaignName && !!campaigns && !!getCurrentCampaign
    ),
  }) as {
    data: whatsappTable[];
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    data,
    errorMessage,
    isLoading: getWhatsappIsLoading || userProfileIsLoading || isLoadingGetCampaigns,
    refetch,
  };
};

export default GetWhatsapp;
