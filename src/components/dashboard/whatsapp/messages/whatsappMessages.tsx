"use client";

import { useState } from "react";
import WhatsAppMessagesLoading from "./messagesLoading";
import "./style.css";
import WhatsappDeleteMessageDialog from "./whatsappDeleteMessageDialog";
import WhatsappEditMessageDialog from "./whatsappEditMessageDialog";
import WhatsAppMessageCard from "./whatsappMessageCard";
import Form from "@/components/form";
import ContentCard from "@/components/layout/contentCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import BusinessRules from "@/lib/businessRules";
import { deleteDialogSchema, messageSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

export function WhatsAppMessages({
  isLoading,
  messages,
  campaignId,
  refetch,
  userPlan,
}: {
  isLoading: boolean;
  messages: any[];
  campaignId: string;
  refetch: () => void;
  userPlan: string;
}) {
  const translate = useTranslations(
    "Pages.Dashboard.Whatsapp.MessageComponent"
  );

  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const [messageToBeEdited, setMessageToBeEdited] = useState<any>(null);
  const [messageToBeDeleted, setMessageToBeDeleted] = useState<any>(null);

  const [isModalEditMessageOpen, setIsModalEditMessageOpen] =
    useState<boolean>(false);
  const [isModalDeleteMessageOpen, setIsModalDeleteMessageOpen] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const maxMessages = BusinessRules[userPlan]?.maxMessages;

  const mutation = useMutation({
    mutationFn: async (entries) => {
      setErrorMessage(null);
      setSuccessMessage(null);

      // CLIENT SIDE
      const supabase = await createClient();
      const { error } = await supabase
        .from("campaigns")
        .update({ wp_messages: entries })
        .eq("id", campaignId);

      if (error) {
        setErrorMessage(translate["alertMessage"]);
        return false;
      } else {
        return true;
      }
    },
    onError: () => {
      setIsFormLoading(false);
      setIsModalEditMessageOpen(false);
      setIsModalDeleteMessageOpen(false);
      addMessageForm.reset();
      deleteMessageForm.reset();
      editMessageForm.reset();
      return setErrorMessage(translate["alertMessage"]);
    },
    onSuccess: () => {
      setIsFormLoading(false);
      setIsModalEditMessageOpen(false);
      setIsModalDeleteMessageOpen(false);
      addMessageForm.reset();
      deleteMessageForm.reset();
      editMessageForm.reset();
      refetch();
      return setSuccessMessage(translate["successMessage"]);
    },
  });

  const addMessageForm = useForm({
    defaultValues: {
      messageTitle: "",
      messageContent: "",
    },
    validators: {
      onSubmit: messageSchema,
    },
    onSubmit: async ({ value }) => {
      setIsFormLoading(true);
      const newMessage = {
        id: Date.now().toString(),
        title: value.messageTitle,
        content: value.messageContent,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!messages) {
        return await mutation.mutate([newMessage] as any);
      }
      const updatedMessages = [...messages, newMessage];
      return await mutation.mutate(updatedMessages as any);
    },
  });

  const deleteMessageForm = useForm({
    defaultValues: {
      deleteWord: "",
    },
    validators: {
      onSubmit: deleteDialogSchema,
    },
    onSubmit: async ({ value }) => {
      setIsFormLoading(true);
      if (value?.deleteWord === "deletar") {
        const updatedMessages = messages.filter(
          (message) => message.id !== messageToBeDeleted.id
        );
        mutation.mutate(updatedMessages as any);
      }
    },
  });

  const editMessageForm = useForm({
    defaultValues: {
      messageTitle: messageToBeEdited?.title || "",
      messageContent: messageToBeEdited?.content || "",
    },
    validators: {
      onSubmit: messageSchema,
    },
    onSubmit: async ({ value }) => {
      setIsFormLoading(true);
      const updatedMessages = messages.map((message) =>
        message.id === messageToBeEdited.id
          ? {
              ...message,
              title: value.messageTitle,
              content: value.messageContent,
              updatedAt: new Date().toISOString(),
            }
          : message
      );
      return await mutation.mutate(updatedMessages as any);
    },
  });

  return (
    <ContentCard title={translate["componentTitle"]}>
      {errorMessage && (
        <div className="container mb-10">
          <AlertBanner message={translate["alertMessage"]} type="error" />
        </div>
      )}
      {successMessage && (
        <div className="container mb-10">
          <AlertBanner message={translate["successMessage"]} type="success" />
        </div>
      )}
      <div className="w-full">
        {Boolean(!messages?.length || messages?.length < maxMessages) && (
          <div className="mt-6">
            <Form
              fieldsToRender={[
                {
                  label:
                    translate["addMessageForm"]["fields"]["messageTitle"][
                      "label"
                    ],
                  name: translate["addMessageForm"]["fields"]["messageTitle"][
                    "name"
                  ],
                  type: "text",
                },
                {
                  label:
                    translate["addMessageForm"]["fields"]["messageContent"][
                      "label"
                    ],
                  name: translate["addMessageForm"]["fields"]["messageContent"][
                    "name"
                  ],
                  type: "textArea",
                },
                {
                  label:
                    translate["addMessageForm"]["fields"]["attachmentFile"][
                      "label"
                    ],
                  name: translate["addMessageForm"]["fields"]["attachmentFile"][
                    "name"
                  ],
                  type: "file",
                  buttonText:
                    translate["addMessageForm"]["fields"]["attachmentFile"][
                      "buttonText"
                    ],
                  accept: "image/*,.pdf,.doc,.docx", // Optional: specify accepted file types
                },
              ]}
              form={addMessageForm}
              isLoading={isFormLoading}
              submitLabel={translate["addMessageForm"]["submitLabel"]}
              submitLoadingLabel={
                translate["addMessageForm"]["submitLoadingLabel"]
              }
            />
            <div className="h-[1px] border-b mt-6 mb-6" />
          </div>
        )}
        {isLoading && <WhatsAppMessagesLoading />}
        {Boolean(!isLoading && !messages?.length) && (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7 text-center text-center">
              {!campaignId ? translate["noCampaign"] : translate["noData"]}
            </div>
          </div>
        )}
        {Boolean(!isLoading && messages?.length) && (
          <div className="mb-5">{translate["messagesRegistered"]}</div>
        )}
        {!isLoading &&
          messages?.map((message, index) => (
            <div className="mt-6" key={`${message.title}-${index}`}>
              <WhatsAppMessageCard
                message={message}
                translate={translate}
                onEdit={(message) => {
                  setMessageToBeEdited(message);
                  setIsModalDeleteMessageOpen(false);
                  setIsModalEditMessageOpen(true);
                }}
                onDelete={(message) => {
                  setMessageToBeDeleted(message);
                  setIsModalDeleteMessageOpen(true);
                  setIsModalEditMessageOpen(false);
                }}
              />
            </div>
          ))}
        <WhatsappEditMessageDialog
          form={editMessageForm}
          isLoading={isFormLoading}
          isModalOpen={isModalEditMessageOpen}
          message={messageToBeEdited}
          setIsModalOpen={setIsModalEditMessageOpen}
          translate={translate}
        />
        <WhatsappDeleteMessageDialog
          form={deleteMessageForm}
          isLoading={isFormLoading}
          isModalOpen={isModalDeleteMessageOpen}
          message={messageToBeDeleted}
          setIsModalOpen={setIsModalDeleteMessageOpen}
          translate={translate}
        />
      </div>
    </ContentCard>
  );
}
