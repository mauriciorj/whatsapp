import { useState } from "react";
import getCampaigns from "@/features/campaigns/lib/getCampaigns";
import { Tables } from "@/db/types/database.types";
import createClient from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

const getMessages = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    currentCampaign,
    data: campaigns,
    isLoading: isLoadingGetCampaigns,
  } = getCampaigns();

  const {
    data,
    error,
    isLoading: getMessagesIsLoading,
    refetch,
  } = useQuery<any>({
    queryKey: ["whatsappMessages", currentCampaign?.id],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("campaign_messages")
        .select()
        .eq("campaign_id", currentCampaign?.id);

      if (error) {
        setErrorMessage(
          "Ops... algo deu errado. Tente novamente mais tarde ou entre em contato com o nosso suporte"
        );
      }

      return data || [];
    },
    enabled: Boolean(!!campaigns && !!currentCampaign),
  }) as {
    data: Tables<"campaign_messages">;
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    data,
    errorMessage,
    isLoading: getMessagesIsLoading || isLoadingGetCampaigns,
  };
};

export default getMessages;
