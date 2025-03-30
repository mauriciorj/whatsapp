import { useUserProfile } from "./useUserProfile";
import { createClient } from "@/supabase/client";
import { CampaignsType } from "@/db/types/types";
import { useQuery } from "@tanstack/react-query";

export function useUserCampaigns() {
  const { user } = useUserProfile();

  const {
    data: campaigns,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userCampaign", user?.user_id],
    queryFn: async () => {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("campaigns")
        .select("id, title, user_id")
        .eq("user_id", user?.user_id);

      if (error) {
        throw new Error(error.message);
      }

      return data?.sort((a, b) => a.title.localeCompare(b.title)) || [];
    },
    enabled: !!user?.user_id, // Only run the query if we have a user_id
  }) as {
    data: CampaignsType[];
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    campaigns,
    isLoading,
    error,
    refetch,
  };
}
