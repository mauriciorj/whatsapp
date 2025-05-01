import { useState } from "react";
import { useCampaigns } from "./useCampaigns";
import { useUserProfile } from "./useUserProfile";
import { Tables } from "@/db/types/database.types";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useReports({
  campaignName,
  reportPeriod,
}: {
  campaignName?: string | null;
  reportPeriod: number;
}) {
  const [serverError, setServerError] = useState<boolean | null>(null);

  const {
    data: user,
    errorMessage: userErrorMessage,
    isLoading: isUserLoading,
  } = useUserProfile();

  const {
    data: campaigns,
    errorMessage: campaignsErrorMessage,
    isLoading: isCampaignsLoading,
  } = useCampaigns({
    campaignName,
    translate: null,
  });

  const getCurrentCampaign = campaigns?.find(
    (campaign: any) => campaign.title === campaignName
  );

  const timePeriod = new Date(
    new Date().setDate(new Date().getDate() - reportPeriod)
  ).toISOString();

  const { data, error, isLoading, refetch } = useQuery<any>({
    queryKey: ["whatsappTracking", getCurrentCampaign?.id, reportPeriod],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("whatsapp_tracking")
        .select("created_at, country, city, device_size, device_system", {
          count: "exact",
        })
        .eq("campaign_id", getCurrentCampaign?.id)
        .gte("created_at", timePeriod)
        .order("created_at", { ascending: true });

      if (error) {
        setServerError(true);
      }

      return data || [];
    },
    enabled: Boolean(!!user?.user_id && !!campaignName && !!campaigns),
  }) as {
    data: Tables<"company">[];
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    data,
    isLoading: isLoading || isUserLoading || isCampaignsLoading,
    errorMessage: userErrorMessage || campaignsErrorMessage || error?.message || serverError,
    refetch,
  };
}
