"use client";

import { useState } from "react";
import createClient from "@/db/supabase/client";
import useWhatsapp from "@/features/whatsapp/hooks/useWhatsapp";
import useTranslations from "@/hooks/useTranslations";
import { linkSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

const UpdateWhatsappLink = () => {
  const formTranslation = useTranslations("Features.UpdateWhatsappLink");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { currentCampaign } = useWhatsapp();

  const mutation = useMutation({
    mutationFn: async (entries) => {
      setErrorMessage(null);
      setSuccessMessage(null);

      // CLIENT SIDE
      const supabase = await createClient();
      const { error } = await supabase
        .from("campaigns")
        .update({
          wp_link: entries,
        })
        .eq("id", currentCampaign?.id);

      if (error) {
        setErrorMessage(formTranslation["Dialog"]["alertMessage"]);
        return false;
      } else {
        return true;
      }
    },
    onError: () => {
      setSuccessMessage(null);
      setIsModalOpen(false);
      form.reset();
      return setErrorMessage(formTranslation["Dialog"]["alertMessage"]);
    },
    onSuccess: () => {
      setSuccessMessage(formTranslation["Dialog"]["successMessage"]);
      setIsModalOpen(false);
      setErrorMessage(null);
      form.reset();
      //   refetch();
    },
  });

  const form = useForm({
    defaultValues: {
      link: "",
    },
    validators: {
      onSubmit: linkSchema,
    },
    onSubmit: async ({ value }: any) => {
      return await mutation.mutate(value?.link as any);
    },
  });

  return {
    errorMessage,
    form,
    formTranslation,
    isLoading: mutation.isPending,
    isModalOpen,
    setIsModalOpen,
    successMessage,
  };
};

export default UpdateWhatsappLink;
