"use client";

import { useState } from "react";
import useWhatsapp from "@/features/whatsapp/hooks/useWhatsapp";
import useTranslations from "@/hooks/useTranslations";
import { messageSchema } from "@/lib/validations/schemas";
import createClient from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

const UpdateWhatsappMessage = () => {
  const formTranslation = useTranslations("Features.DeleteWhatsappMessageForm");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [messageToBeUpdate, setMessageToBeUpdate] = useState<any>(null);

  const { currentCampaign } = useWhatsapp();

  const mutation = useMutation({
    mutationFn: async (entries) => {
      setErrorMessage(null);
      setSuccessMessage(null);

      const supabase = await createClient();
      const { error } = await supabase
        .from("campaigns")
        .update({ wp_messages: entries })
        .eq("id", currentCampaign?.id);

      if (error) {
        setErrorMessage(formTranslation["alertMessage"]);
        return false;
      } else {
        return true;
      }
    },
    onError: () => {
      setIsModalOpen(false);
      form.reset();
      return setErrorMessage(formTranslation["alertMessage"]);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      form.reset();
      setSuccessMessage(formTranslation["successMessage"]);
    },
  });

  const form = useForm({
    defaultValues: {
      messageTitle: messageToBeUpdate?.title || "",
      messageContent: messageToBeUpdate?.content || "",
    },
    validators: {
      onSubmit: messageSchema,
    },
    onSubmit: async ({ value }) => {
      // const updatedMessages = messages.map((message) =>
      //   message.id === messageToBeUpdate.id
      //     ? {
      //         ...message,
      //         title: value.messageTitle,
      //         content: value.messageContent,
      //         updatedAt: new Date().toISOString(),
      //       }
      //     : message
      // );
      const updatedMessages = value.messageTitle;
      return await mutation.mutate(updatedMessages as any);
    },
  });

  return {
    form,
    formTranslation,
    errorMessage,
    isLoading: mutation.isPaused,
    isModalOpen,
    messageToBeUpdate,
    setIsModalOpen,
    setMessageToBeUpdate,
    successMessage,
  };
};

export default UpdateWhatsappMessage;
