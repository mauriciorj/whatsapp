"use client";

import { useState } from "react";
import { Tables } from "@/db/types/database.types";
import useTranslations from "@/hooks/useTranslations";
import { editDialogSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

const UpdateCampaign = () => {
  const formTranslation = useTranslations("Features.EditCampaignForm");

  const [updateCampaignToDialog, setUpdateCampaignToDialog] =
    useState<Tables<"campaigns"> | null>(null);

  const [isUpdateCampaignModalOpen, setIsUpdateCampaignModalOpen] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      campaignName: updateCampaignToDialog?.title || "",
      campaignStartDate: null,
      campaignEndDate: null,
    },
    validators: {
      onSubmit: editDialogSchema,
    },
    onSubmit: async ({ value }: { value: { campaignName: string } }) => {
      console.log(value)
      setErrorMessage(null);
      setSuccessMessage(null);
    },
  });
  return {
    errorMessage,
    form,
    formTranslation,
    isUpdateCampaignModalOpen,
    setIsUpdateCampaignModalOpen,
    setUpdateCampaignToDialog,
    successMessage,
    updateCampaignToDialog,
  };
};

export default UpdateCampaign;
