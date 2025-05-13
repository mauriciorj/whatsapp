import { useEffect } from "react";
import createWhatsappPhone from "@/features/whatsapp/lib/createWhatsappPhone";
import getWhatsapp from "@/features/whatsapp/lib/getWhatsapp";
import { Tables } from "@/db/types/database.types";
import getCampaigns from "@/features/campaigns/lib/getCampaigns";
import getUserProfile from "@/features/user/lib/getUserProfile";
import { useSocket } from "@/hooks/useSocket";
// import SocketClient from "@/lib/socket";

type tableWhatsapp = Tables<"whatsapp">[];

interface tableCampaign {
  companyId: string;
  campaignId: string;
}

export type queryResult = tableWhatsapp & tableCampaign;

const useWhatsapp = () => {
  const { userProfile, userProfileIsLoading } = getUserProfile();

  const { currentCampaign, isLoading: campaignsIsLoading } = getCampaigns();

  const { socket, companyId } = useSocket();

  const {
    addPhoneNameForm,
    errorMessage: createWhatsappPhoneErrorMessage,
    isLoading: createWhatsappPhoneIsLoading,
  } = createWhatsappPhone();

  const {
    data,
    errorMessage: getWhatsappErrorMessage,
    isLoading: getWhatsappIsLoading,
    refetch,
  } = getWhatsapp();

  useEffect(() => {
    if (socket && companyId) {
      socket.on(
        `company-${userProfile.company_id}-whatsappConnection`,
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
  //   if (userProfile?.company_id) {
  //     const socket = SocketClient.getInstance(userProfile.company_id);
  //     socket.on(`company-${userProfile.company_id}-whatsappConnection`, (data: any) => {
  //       console.log("data => ", data);
  //     });
  //   }
  // }, [SocketClient, userProfile?.company_id]);

  return {
    addPhoneNameForm,
    companyId: userProfile?.company_id || null,
    currentCampaign,
    data,
    isLoading:
      getWhatsappIsLoading ||
      userProfileIsLoading ||
      campaignsIsLoading ||
      createWhatsappPhoneIsLoading,
    errorMessage: createWhatsappPhoneErrorMessage || getWhatsappErrorMessage,
    refetch,
  };
};

export default useWhatsapp;
