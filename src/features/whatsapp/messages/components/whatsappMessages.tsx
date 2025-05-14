"use client";

import WhatsAppMessagesLoading from "./messagesLoading";
import "./style.css";
import WhatsappDeleteMessageDialog from "./whatsappDeleteMessageDialog";
import WhatsappUpdateMessageDialog from "./whatsappUpdateMessageDialog";
import WhatsAppMessageCard from "./whatsappMessageCard";
import Form from "@/components/form";
import ContentCard from "@/components/layout/contentCard";
import AlertBanner from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import DeleteWhatsappMessage from "../lib/deleteWhatsappMessage";
import UpdateWhatsappMessage from "../lib/updateWhatsappMessage";
import CreateWhatsappMessage from "../lib/createWhatsappMessage";

const WhatsAppMessages = ({
  isLoading,
  messages,
  campaignId,
  // refetch,
}: {
  isLoading: boolean;
  messages: any[];
  campaignId: string;
  // refetch: () => void;
}) => {
  const translations = useTranslations(
    "Pages.Dashboard.Whatsapp.MessageComponent"
  );

  const {
    form: createWhatsappMessageForm,
    formTranslation: createWhatsappMessageFormTranslation,
    errorMessage: createWhatsappMessageErrorMessage,
    isLoading: createWhatsappMessageIsLoading,
    successMessage: createWhatsappMessageSuccessMessage,
  } = CreateWhatsappMessage();

  const {
    form: deleteWhatsappMessageForm,
    formTranslation: deleteWhatsappMessageFormTranslation,
    errorMessage: deleteWhatsappMessageErrorMessage,
    isLoading: deleteWhatsappMessageIsLoading,
    isModalOpen: deleteWhatsappMessageIsModalOpen,
    messageToBeDeleted,
    setIsModalOpen: deleteWhatsappMessageSetIsModalOpen,
    setMessageToBeDeleted,
    successMessage: deleteWhatsappMessageSuccessMessage,
  } = DeleteWhatsappMessage();

  const {
    form: updateWhatsappMessageForm,
    formTranslation: updateWhatsappMessageFormTranslation,
    errorMessage: updateWhatsappMessageErrorMessage,
    isLoading: updateWhatsappMessageIsLoading,
    isModalOpen: updateWhatsappMessageIsModalOpen,
    messageToBeUpdate,
    setIsModalOpen: updateWhatsappMessageSetIsModalOpen,
    setMessageToBeUpdate,
    successMessage: updateWhatsappMessageSuccessMessage,
  } = UpdateWhatsappMessage();

  return (
    <ContentCard
      description={translations["componentDescription"]}
      title={translations["componentTitle"]}
    >
      <div className="container mb-10">
        <AlertBanner
          message={
            createWhatsappMessageErrorMessage ||
            deleteWhatsappMessageErrorMessage ||
            updateWhatsappMessageErrorMessage
          }
          type="error"
        />
      </div>
      <div className="container mb-10">
        <AlertBanner
          message={
            createWhatsappMessageSuccessMessage ||
            deleteWhatsappMessageSuccessMessage ||
            updateWhatsappMessageSuccessMessage
          }
          type="success"
        />
      </div>

      <div className="w-full">
        {Boolean(!messages?.length) && (
          <div className="mt-6">
            <Form
              fieldsToRender={[
                {
                  label:
                    createWhatsappMessageFormTranslation["addMessageForm"][
                      "fields"
                    ]["messageTitle"]["label"],
                  name: createWhatsappMessageFormTranslation["addMessageForm"][
                    "fields"
                  ]["messageTitle"]["name"],
                  type: "text",
                },
                {
                  label:
                    createWhatsappMessageFormTranslation["addMessageForm"][
                      "fields"
                    ]["messageContent"]["label"],
                  name: createWhatsappMessageFormTranslation["addMessageForm"][
                    "fields"
                  ]["messageContent"]["name"],
                  type: "textArea",
                },
                {
                  label:
                    createWhatsappMessageFormTranslation["addMessageForm"][
                      "fields"
                    ]["attachmentFile"]["label"],
                  name: createWhatsappMessageFormTranslation["addMessageForm"][
                    "fields"
                  ]["attachmentFile"]["name"],
                  type: "file",
                  buttonText:
                    createWhatsappMessageFormTranslation["addMessageForm"][
                      "fields"
                    ]["attachmentFile"]["buttonText"],
                  accept: "image/*,.pdf,.doc,.docx", // Optional: specify accepted file types
                },
              ]}
              form={createWhatsappMessageForm}
              isLoading={createWhatsappMessageIsLoading}
              submitLabel={
                createWhatsappMessageFormTranslation["addMessageForm"][
                  "submitLabel"
                ]
              }
              submitLoadingLabel={
                createWhatsappMessageFormTranslation["addMessageForm"][
                  "submitLoadingLabel"
                ]
              }
            />
            <div className="h-[1px] border-b mt-6 mb-6" />
          </div>
        )}
        {isLoading && <WhatsAppMessagesLoading />}
        {Boolean(!isLoading && !messages?.length) && (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7 text-center text-center">
              {!campaignId
                ? translations["noCampaign"]
                : translations["noData"]}
            </div>
          </div>
        )}
        {Boolean(!isLoading && messages?.length) && (
          <div className="mb-5">{translations["messagesRegistered"]}</div>
        )}
        {!isLoading &&
          messages?.map((message, index) => (
            <div className="mt-6" key={`${message.title}-${index}`}>
              <WhatsAppMessageCard
                message={message}
                translations={translations}
                onEdit={(message) => {
                  setMessageToBeUpdate(message);
                  deleteWhatsappMessageSetIsModalOpen(false);
                  updateWhatsappMessageSetIsModalOpen(true);
                }}
                onDelete={(message) => {
                  setMessageToBeDeleted(message);
                  deleteWhatsappMessageSetIsModalOpen(true);
                  updateWhatsappMessageSetIsModalOpen(false);
                }}
              />
            </div>
          ))}
        <WhatsappUpdateMessageDialog
          form={updateWhatsappMessageForm}
          isLoading={updateWhatsappMessageIsLoading}
          isModalOpen={updateWhatsappMessageIsModalOpen}
          message={messageToBeUpdate}
          setIsModalOpen={updateWhatsappMessageSetIsModalOpen}
          translations={updateWhatsappMessageFormTranslation}
        />
        <WhatsappDeleteMessageDialog
          form={deleteWhatsappMessageForm}
          isLoading={deleteWhatsappMessageIsLoading}
          isModalOpen={deleteWhatsappMessageIsModalOpen}
          message={messageToBeDeleted}
          setIsModalOpen={deleteWhatsappMessageSetIsModalOpen}
          translations={deleteWhatsappMessageFormTranslation}
        />
      </div>
    </ContentCard>
  );
};

export default WhatsAppMessages;
