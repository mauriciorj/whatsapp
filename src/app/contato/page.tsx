"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import SendContactWebForm from "@/actions/sendContactWebForm/actions";
import useTranslations from "@/hooks/useTranslations";
import { contactSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";
import PageLayout from "@/components/layout/pageLayout";
import AuthCard from "@/components/auth/auth-card";
import { AlertBanner } from "@/components/ui/alert-banner";
import Form from "@/components/form";

export default function Contato() {
  const translate = useTranslations("Pages.Contact");

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

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
        const response = await SendContactWebForm(
          value as {
            email: string;
            subject: string;
            name: string;
            message: string;
          }
        );
        if (response === false) {
          setServerError(true);
        } else {
          setServerError(false);
          setIsSubmitted(true);
        }
      } catch {
        setServerError(true);
      }
    },
  });

  const breadcrumbItems = [{ href: "/contato", label: "Contato", icon: Mail }];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <AuthCard
        title={translate["cardTitle"]}
        description={translate["cardDescription"]}
      >
        {serverError && (
          <AlertBanner
            message={translate["form"]["alertMessage"]}
            type="error"
          />
        )}
        {isSubmitted && (
          <AlertBanner
            message={translate["form"]["successMessage"]}
            type="error"
          />
        )}
        {!isSubmitted && (
          <div>
            <Form
              fieldsToRender={[
                {
                  label: translate["form"]["fields"]["name"]["label"],
                  name: translate["form"]["fields"]["name"]["name"],
                  type: "text",
                },
                {
                  label: translate["form"]["fields"]["email"]["label"],
                  name: translate["form"]["fields"]["email"]["name"],
                  type: "email",
                },
                {
                  label: translate["form"]["fields"]["subject"]["label"],
                  name: translate["form"]["fields"]["subject"]["name"],
                  type: "text",
                },
                {
                  label: translate["form"]["fields"]["message"]["label"],
                  name: translate["form"]["fields"]["message"]["name"],
                  maxLength: 1000,
                  type: "textArea",
                },
              ]}
              form={form}
              submitLabel={translate["form"]["submitLabel"]}
              submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
            />
          </div>
        )}
      </AuthCard>
    </PageLayout>
  );
}
