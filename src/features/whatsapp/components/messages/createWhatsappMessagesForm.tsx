"use client";

import Form from "@/components/form";
import ContentCard from "@/components/layout/contentCard";

const CreateWhatsappMessagesForm = ({
  form,
  translations,
  isLoading,
}: {
  form: any;
  translations: any;
  isLoading: boolean;
}) => {
  return (
    <ContentCard className="w-full max-w-lg px-10 pb-10" description={} title={}>
      <Form
        fieldsToRender={[
          {
            label:
              translations["form"]["fields"][
                "messageTitle"
              ]["label"],
            name: translations["form"]["fields"][
              "messageTitle"
            ]["name"],
            type: "text",
          },
          {
            label:
              translations["form"]["fields"][
                "messageContent"
              ]["label"],
            name: translations["form"]["fields"][
              "messageContent"
            ]["name"],
            type: "textArea",
          },
          {
            label:
              translations["form"]["fields"][
                "attachmentFile"
              ]["label"],
            name: translations["form"]["fields"][
              "attachmentFile"
            ]["name"],
            type: "file",
            buttonText:
              translations["form"]["fields"][
                "attachmentFile"
              ]["buttonText"],
            accept: "image/*,.pdf,.doc,.docx", // Optional: specify accepted file types
          },
        ]}
        form={form}
        isLoading={isLoading}
        submitLabel={translations["form"]["submitLabel"]}
        submitLoadingLabel={
          translations["form"]["submitLoadingLabel"]
        }
      />
      <div className="h-[1px] border-b mt-6 mb-6" />
    </ContentCard>
  );
};

export default CreateWhatsappMessagesForm;
