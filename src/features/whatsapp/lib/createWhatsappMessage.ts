"use client";

import { useState } from "react";
import getCampaigns from "@/features/campaigns/lib/getCampaigns";
import useTranslations from "@/hooks/useTranslations";
import { messageSchema } from "@/lib/validations/schemas";
import createClient from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

const createWhatsappMessage = () => {
  const formTranslation = useTranslations("Features.CreateWhatsappMessagesForm");

  const { currentCampaign } = getCampaigns();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (entries) => {
      setErrorMessage(null);
      setSuccessMessage(null);

      const supabase = await createClient();
      const { error } = await supabase
        .from("campaign_messages")
        .update({ entries })
        .eq("id", currentCampaign?.id);

      if (error) {
        setErrorMessage(formTranslation["alertMessage"]);
        return false;
      } else {
        return true;
      }
    },
    onError: () => {
      form.reset();
      return setErrorMessage(formTranslation["alertMessage"]);
    },
    onSuccess: () => {
      form.reset();
      //   refetch();
      return setSuccessMessage(formTranslation["successMessage"]);
    },
  });

  const form = useForm({
    defaultValues: {
      messageTitle: "",
      messageContent: "",
    },
    validators: {
      onSubmit: messageSchema,
    },
    onSubmit: async ({ value }) => {
      const newMessage = {
        id: Date.now().toString(),
        title: value.messageTitle,
        content: value.messageContent,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return await mutation.mutate(newMessage as any);
    },
  });

  return { form, errorMessage, isLoading: mutation.isPending, successMessage };
};

export default createWhatsappMessage;
