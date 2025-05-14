"use client";

import { useState } from "react";
import useWhatsapp from "@/features/whatsapp/hooks/useWhatsapp";
import useTranslations from "@/hooks/useTranslations";
import { deleteDialogSchema } from "@/lib/validations/schemas";
import createClient from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

const DeleteWhatsappMessage = () => {
  const formTranslation = useTranslations("Features.DeleteWhatsappMessageForm");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [messageToBeDeleted, setMessageToBeDeleted] = useState<any>(null);

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
      deleteWord: "",
    },
    validators: {
      onSubmit: deleteDialogSchema,
    },
    onSubmit: async ({ value }) => {
      if (value?.deleteWord === "deletar") {
        // const updatedMessages = messages.filter(
        //   (message) => message.id !== messageToBeDeleted.id
        // );
        const updatedMessages = ["test"];
        mutation.mutate(updatedMessages as any);
      }
    },
  });

  return {
    form,
    formTranslation,
    errorMessage,
    isLoading: mutation.isPaused,
    isModalOpen,
    messageToBeDeleted,
    setIsModalOpen,
    setMessageToBeDeleted,
    successMessage,
  };
};

export default DeleteWhatsappMessage;
