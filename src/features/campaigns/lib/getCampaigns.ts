"use client";

import { useSearchParams } from "next/navigation";
import { Tables } from "@/db/types/database.types";
import getUserProfile from "@/features/user/lib/getUserProfile";
import createClient from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

const getCampaigns = () => {
  const searchParams = useSearchParams();
  const { userProfile } = getUserProfile();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userCampaign", userProfile?.company_id],
    queryFn: async () => {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("campaigns")
        .select()
        .eq("company_id", userProfile?.company_id);

      if (error) {
        throw new Error(error.message);
      }

      return (
        data?.sort((a, b) => {
          if (a?.title && b?.title) {
            return a.title.localeCompare(b.title);
          } else {
            return 0;
          }
        }) || []
      );
    },
    enabled: !!userProfile?.company_id, // Only run the query if we have a company_id
  }) as {
    data: Tables<"campaigns">[];
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  const currentCampaign = data?.find(
    (campaign: any) => campaign.title === campaignName
  );

  return {
    currentCampaign,
    data,
    isLoading,
    errorMessage: error,
    refetch,
  };
};

export default getCampaigns;
