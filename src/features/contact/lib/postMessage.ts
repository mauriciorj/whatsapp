"use client";

import { useState } from "react";
import postMessageAction from "@/actions/postMessage/actions";
import useTranslations from "@/hooks/useTranslations";
import { contactSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

const PostMessage = () => {
  const translations = useTranslations("Features.ContactForm");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: async ({ value }: any) => {
      try {
        const response = await postMessageAction(
          value as {
            email: string;
            subject: string;
            name: string;
            message: string;
          }
        );
        if (response === false) {
          setSuccessMessage(null);
          setErrorMessage(translations["alertMessage"]);
        } else {
          setErrorMessage(null);
          setSuccessMessage(translations["successMessage"]);
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(translations["alertMessage"]);
      }
    },
  });

  return { errorMessage, form, translations, successMessage };
};

export default PostMessage;
