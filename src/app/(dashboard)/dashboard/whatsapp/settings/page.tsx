"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { useForm } from "@tanstack/react-form";
import Form from "@/components/form";
import { campaignSettingsSchema } from "@/lib/validations/schemas";
import ContentCard from "@/components/layout/contentCard";

const SettingsPage = () => {
  const translate = useTranslations("Pages.Dashboard.Settings");

  const [serverError, setServerError] = useState<boolean | null>(null);

  const form = useForm({
    defaultValues: {
      campaignName: "Link Personalizado",
      campaignDescription: "Campanha de teste",
      startDate: "2025-03-03",
      endDate: "2025-05-05",
      leadsPerGroup: 150,
      sameLeadsInGroups: "Não",
      redirectLink: "https://zaprouter.pro/wp/teste-longo-de-string-para-mobile",
    },
    validators: {
      onSubmit: campaignSettingsSchema,
    },
    onSubmit: async ({ value }: any) => {
      console.log("value", value);
    },
  });

  const breadcrumbItems = [
    {
      href: "/dashboard/settings",
      label: "Configurações",
      icon: MessageCircle,
    },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={translate["pageTitle"]}
      pageDescription={translate["pageDescription"]}
    >
      {serverError && (
        <div className="container mb-10">
          <AlertBanner message={translate["alertMessage"]} type="error" />
        </div>
      )}
      <ContentCard>
        <Form
          fieldsToRender={[
            {
              label: "Nome da campanha",
              name: "campaignName",
              type: "text",
            },
            {
              label: "Descrição",
              name: "campaignDescription",
              type: "text",
            },
            {
              label: "Data de início",
              name: "startDate",
              type: "text",
            },
            {
              label: "Data de término",
              name: "endDate",
              type: "text",
            },
            {
              label: "Quantidade de pessoas por grupo",
              name: "leadsPerGroup",
              type: "text",
            },
            {
              label: "O mesmo lead pode estar em mais de um grupo",
              name: "sameLeadsInGroups",
              type: "text",
            },
            {
              label: "Link",
              name: "redirectLink",
              type: "text",
            },
          ]}
          form={form}
          submitLabel="Salvar"
          submitLoadingLabel="Salvando..."
        />
      </ContentCard>
    </PageLayout>
  );
};

export default SettingsPage;
