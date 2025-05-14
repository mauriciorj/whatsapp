import { useState } from "react";
import { Tables } from "@/db/types/database.types";
import GetCampaigns from "@/features/campaigns/lib/getCampaigns";
import GetUserProfile from "@/features/user/lib/getUserProfile";
import createClient from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

const GetReport = ({ reportsPeriod }: { reportsPeriod: number }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { userProfile, userProfileError, userProfileIsLoading } =
    GetUserProfile();

  const {
    currentCampaign,
    data: campaigns,
    isLoading: isLoadingGetCampaigns,
  } = GetCampaigns();

  const timePeriod = new Date(
    new Date().setDate(new Date().getDate() - reportsPeriod)
  ).toISOString();

  const {
    data,
    error: getReportError,
    isLoading: getReportLoading,
    refetch,
  } = useQuery<any>({
    queryKey: ["whatsappTracking", currentCampaign?.id, reportsPeriod],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("whatsapp_tracking")
        .select("created_at, country, city, device_size, device_system", {
          count: "exact",
        })
        .eq("campaign_id", currentCampaign?.id)
        .gte("created_at", timePeriod)
        .order("created_at", { ascending: true });

      if (error) {
        setErrorMessage(
          "Ops... algo deu errado. Tente novamente mais tarde ou entre em contato com o nosso suporte"
        );
      }

      return data || [];
    },
    enabled: Boolean(
      !!userProfile?.user_id && !!currentCampaign && !!campaigns
    ),
  }) as {
    data: Tables<"company">[];
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    data,
    error: userProfileError || getReportError || errorMessage,
    isLoading:
      userProfileIsLoading || isLoadingGetCampaigns || getReportLoading,
    refetch,
  };
};

export default GetReport;
