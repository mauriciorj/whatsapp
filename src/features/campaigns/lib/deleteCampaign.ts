"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import deleteCampaignAction from "@/actions/deleteProject/actions";
import { Tables } from "@/db/types/database.types";
import useTranslations from "@/hooks/useTranslations";
import { DELETE_MAGIC_WORD, PAGES } from "@/lib/constants";
import { deleteDialogSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

const deleteCampaign = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formTranslation = useTranslations("Features.DeleteCampaignForm");

  const [deleteCampaignToDialog, setDeleteCampaignToDialog] =
    useState<Tables<"campaigns"> | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleteCampaignModalOpen, setIsDeleteCampaignModalOpen] =
    useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const campaignName = searchParams?.get("campaign") || null;

  const form = useForm({
    defaultValues: {
      deleteWord: "",
    },
    validators: {
      onSubmit: deleteDialogSchema,
    },
    onSubmit: async ({ value }: { value: { deleteWord: string } }) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      if (value?.deleteWord === DELETE_MAGIC_WORD) {
        try {
          const result = await deleteCampaignAction(
            deleteCampaignToDialog
          );
          if (result?.status >= 400) {
            setIsDeleteCampaignModalOpen(false);
            setDeleteCampaignToDialog(null);
            setSuccessMessage(null);
            setErrorMessage(formTranslation["alertMessage"]);
            // add useCampaigns and trigger the refetch
            // setIsRefetch(true);
          } else {
            if (campaignName) {
              router.replace(PAGES.dashboard.campaigns);
              router.refresh();
            }
            setIsDeleteCampaignModalOpen(false);
            setErrorMessage(null);
            setDeleteCampaignToDialog(null);
            setSuccessMessage(formTranslation["successMessage"]);
            form.reset();
            // add useCampaigns and trigger the refetch
            // setIsRefetch(true);
          }
        } catch {
          setSuccessMessage(null);
          setErrorMessage(formTranslation["alertMessage"]);
        }
      } else {
        setSuccessMessage(null);
        setErrorMessage(formTranslation["alertMessage"]);
      }
    },
  });

  return {
    deleteCampaignToDialog,
    errorMessage,
    form,
    formTranslation,
    isDeleteCampaignModalOpen,
    setDeleteCampaignToDialog,
    setIsDeleteCampaignModalOpen,
    successMessage,
  };
};

export default deleteCampaign;
