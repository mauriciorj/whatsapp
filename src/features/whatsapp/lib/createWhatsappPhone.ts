import { useSearchParams } from "next/navigation";
import { useState } from "react";
import getCampaigns from "@/features/campaigns/lib/getCampaigns";
import getUserProfile from "@/features/user/lib/getUserProfile";
import useTranslations from "@/hooks/useTranslations";
import { ENDPOINTS } from "@/lib/constants";
import { phoneName } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ERROR_MESSAGE } from "@/lib/constants";

const createWhatsappPhone = () => {
  const searchParams = useSearchParams();

  const formTranslation = useTranslations("Features.AddPhoneNameForm");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { userProfile, userProfileIsLoading } = getUserProfile();

  const { data: campaigns, isLoading: campaignsIsLoading } = getCampaigns();

  const campaignName = searchParams?.get("campaign") || null;

  const getCurrentCampaign = campaigns?.find(
    (campaign: any) => campaign.title === campaignName
  );

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
        if ((await response?.status) > 400) {
          if (
            (await responseJson?.message) ===
            ERROR_MESSAGE?.WHATSAPP_SOCKET_INIT_ERROR
          ) {
            setErrorMessage(formTranslation["whatsappSocketError"]);
          } else {
            setErrorMessage(formTranslation["whatsappAlreadyExist"]);
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
          companyId: userProfile?.company_id!,
          phoneName: value?.phoneName,
          userId: userProfile?.user_id!,
        });
      } catch (error) {
        console.log("");
        console.log("error => ", error);
      }
    },
  });

  return {
    addPhoneNameForm,
    errorMessage,
    isLoading:
      addPhoneMutation.isPending || userProfileIsLoading || campaignsIsLoading,
  };
};

export default createWhatsappPhone;
