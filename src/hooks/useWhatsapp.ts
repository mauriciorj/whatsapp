import { useEffect, useState } from "react";
import { useCampaigns } from "./useCampaigns";
import { useUserProfile } from "./useUserProfile";
import { Tables } from "@/db/types/database.types";
import { ENDPOINTS } from "@/lib/constants";
import { phoneName } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ERROR_MESSAGE } from "@/lib/constants";
// import SocketClient from "@/lib/socket";
import { useSocket } from "./useSocket";

type tableWhatsapp = Tables<"whatsapp">[];

interface tableCampaign {
  companyId: string;
  campaignId: string;
}

type whatsappTable = {
  id: string;
  name: string;
  status: string;
};

export type queryResult = tableWhatsapp & tableCampaign;

export function useWhatsapp({
  campaignName,
  translate,
}: {
  campaignName?: string | null;
  translate?: any;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<boolean | null>(null);
  const { data: user, isLoading: isUserLoading } = useUserProfile();

  const { data: campaigns, isLoading: isCampaignsLoading } = useCampaigns({
    campaignName,
    translate: null,
  });

  const getCurrentCampaign = campaigns?.find(
    (campaign: any) => campaign.title === campaignName
  );

  const { socket, companyId } = useSocket();

  useEffect(() => {
    if (socket && companyId) {
      socket.on(
        `company-${user.company_id}-whatsappConnection`,
        (data: any) => {
          if (data.action === "OPENING") {
            console.log("OPENING");
          }
          if (data.action === "QR") {
            console.log("QR");
          }
        }
      );
    }
  }, [socket]);

  // useEffect(() => {
  //   if (user?.company_id) {
  //     const socket = SocketClient.getInstance(user.company_id);
  //     socket.on(`company-${user.company_id}-whatsappConnection`, (data: any) => {
  //       console.log("data => ", data);
  //     });
  //   }
  // }, [SocketClient, user?.company_id]);

  const addPhoneMutation = useMutation({
    mutationFn: async ({
      campaignId,
      companyId,
      phoneName,
      userId,
    }: {
      campaignId: string;
      companyId: string;
      phoneName: string;
      userId: string;
    }) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${ENDPOINTS.WHATSAPP}`;
      const body = {
        campaignId,
        companyId,
        phoneName,
        userId,
      };
      try {
        const response = await fetch(url, {
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const responseJson = await response.json();
        console.log("responseJson", responseJson);
        if ((await response?.status) > 400) {
          if (
            (await responseJson?.message) ===
            ERROR_MESSAGE?.WHATSAPP_SOCKET_INIT_ERROR
          ) {
            setErrorMessage(translate?.NumberComponent?.whatsappSocketError);
          } else {
            setErrorMessage(translate?.NumberComponent?.whatsappAlreadyExist);
          }
        }
        return response.json();
      } catch (error) {
        console.log("");
        console.log("error => ", error);
      }
    },
  });

  const addPhoneNameForm = useForm({
    defaultValues: {
      phoneName: "",
    },
    validators: {
      onSubmit: phoneName,
    },
    onSubmit: async ({ value }) => {
      try {
        setErrorMessage(null);
        await addPhoneMutation.mutate({
          campaignId: getCurrentCampaign?.id!,
          companyId: user?.company_id!,
          phoneName: value?.phoneName,
          userId: user?.user_id!,
        });
      } catch (error) {
        console.log("");
        console.log("error => ", error);
      }
    },
  });

  const { data, error, isLoading, refetch } = useQuery<any>({
    queryKey: ["whatsappNumbers", getCurrentCampaign?.id],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("whatsapp")
        .select("id, name, status")
        .eq("campaign_id", getCurrentCampaign?.id);

      if (error) {
        setServerError(true);
      }

      return data || [];
    },
    enabled: Boolean(
      !!user?.user_id && !!campaignName && !!campaigns && !!getCurrentCampaign
    ),
  }) as {
    data: whatsappTable[];
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    addPhoneNameForm,
    campaignId: getCurrentCampaign?.id || null,
    companyId: user?.company_id || null,
    data,
    isLoading:
      isLoading ||
      isUserLoading ||
      isCampaignsLoading ||
      addPhoneMutation.isPending,
    errorMessage: errorMessage || error?.message,
    refetch,
    serverError,
  };
}
