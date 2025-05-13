"use client";

import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import getCampaigns from "./getCampaigns";
import useTranslations from "@/hooks/useTranslations";
import { useForm } from "@tanstack/react-form";
import { campaignSettingsSchema } from "@/lib/validations/schemas";

const campaignSettings = () => {
  const searchParams = useSearchParams();
  const formTranslation = useTranslations("Features.CampaignSettingsForm");

  const { data, errorMessage, isLoading } = getCampaigns();

  const campaignName = searchParams?.get("campaign") || null;

  const getCampaign = data?.find(
    (campaign) => campaign?.title === campaignName
  );

  const form = useForm({
    defaultValues: {
      campaignName: getCampaign?.title || "",
      campaignDescription: "Campanha de teste",
      startDate: dayjs(getCampaign?.start_date).format("DD-MM-YYYY") || "",
      endDate: dayjs(getCampaign?.end_date).format("DD-MM-YYYY") || "",
      leadsPerGroup: "150",
      sameLeadsInGroups: "Não",
      redirectLink: getCampaign?.wp_link || "",
    },
    validators: {
      onSubmit: campaignSettingsSchema,
    },
    onSubmit: async ({ value }: any) => {
      console.log("value", value);
    },
  });

  return {
    form,
    formTranslation,
    errorMessage,
    isLoading,
  };
};

export default campaignSettings;
