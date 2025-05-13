"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import WhatsAppNumbersLoading from "../loading";
import "./style.css";
import DeleteWhatsappNumbersDialog from "./deleteWhatsappNumbersDialog";
import UpdateWhatsappNumbersDialog from "./updateWhatsappNumbersDialog";
import Form from "@/components/form";
import ContentCard from "@/components/layout/contentCard";
import AlertBanner from "@/components/ui/alert-banner";
import { Card } from "@/components/ui/card";
import { Tables } from "@/db/types/database.types";
import useTranslations from "@/hooks/useTranslations";
import useWhatsapp from "@/features/whatsapp/hooks/useWhatsapp";
import { deleteDialogSchema, phoneName } from "@/lib/validations/schemas";
import createClient from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import WhatsAppPhoneNumberCard from "./whatsappNumbersCard";
import WhatsappQRCodeDialog from "../whatsappQrCodeDialog";

type whatsappTable = {
  id: string;
  name: string;
  status: string;
};

const WhatsAppNumbers = ({
  // addPhoneNameForm,
  campaignId,
  isLoading,
  whatsapps,
}: {
  // addPhoneNameForm: any;
  campaignId?: string | null;
  isLoading: boolean;
  whatsapps: whatsappTable[];
}) => {
  const translations = useTranslations(
    "Pages.Dashboard.Whatsapp.NumberComponent"
  );

  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState<boolean>(false);
  const [currentPhoneQrCode, setCurrentPhoneQrCode] = useState<any>(null);

  // Function to show QR code for a specific phone number
  const handleShowQrCode = async (phoneNumber: string) => {
    // Here you would fetch the QR code URL for this number
    // This is just a placeholder - implement actual QR code generation/fetching
    // const qrCodeUrl = await fetch(
    //   "http://api.qrserver.com/v1/create-qr-code/?data=HelloWorld!&size=100x100"
    // );
    // console.log('qrCodeUrl', qrCodeUrl)
    setCurrentPhoneQrCode(
      "https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100"
    );
    setIsQrCodeModalOpen(true);
  };

  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const [numberToBeEdited, setNumberToBeEdited] = useState<any>(null);
  const [numberToBeDeleted, setNumberToBeDeleted] = useState<any>(null);

  const [isModalEditNumberOpen, setIsModalEditNumberOpen] =
    useState<boolean>(false);
  const [isModalDeleteNumberOpen, setIsModalDeleteNumberOpen] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // const mutation = useMutation({
  //   mutationFn: async (entries) => {
  //     setErrorMessage(null);
  //     setSuccessMessage(null);

  //     // CLIENT SIDE
  //     const supabase = await createClient();
  //     const { error } = await supabase
  //       .from("campaigns")
  //       .update({ wp_numbers: entries })
  //       .eq("id", campaignId);

  //     if (error) {
  //       setErrorMessage(translations["alertMessage"]);
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   },
  //   onError: () => {
  //     setIsFormLoading(false);
  //     setIsModalEditNumberOpen(false);
  //     setIsModalDeleteNumberOpen(false);
  //     addNumberform.reset();
  //     deleteNumberform.reset();
  //     editNumberform.reset();
  //     return setErrorMessage(translations["alertMessage"]);
  //   },
  //   onSuccess: () => {
  //     setIsFormLoading(false);
  //     setIsModalEditNumberOpen(false);
  //     setIsModalDeleteNumberOpen(false);
  //     addNumberform.reset();
  //     deleteNumberform.reset();
  //     editNumberform.reset();
  //     refetch();
  //     return setSuccessMessage(translations["successMessage"]);
  //   },
  // });

  // const addNumberform = useForm({
  //   defaultValues: {
  //     phoneName: "",
  //   },
  //   validators: {
  //     onSubmit: phoneName,
  //   },
  //   onSubmit: async ({ value }) => {
  //     // setIsFormLoading(true);
  //     console.log("value => ", value?.phoneName);
  //     console.log("campaignId => ", campaignId);
  //     console.log("companyId => ", companyId);
  //   },
  // });

  // const deleteNumberform = useForm({
  //   defaultValues: {
  //     deleteWord: "",
  //   },
  //   validators: {
  //     onSubmit: deleteDialogSchema,
  //   },
  //   onSubmit: async ({ value }) => {
  //     setIsFormLoading(true);
  //     if (value?.deleteWord === "deletar") {
  //       const updatedNumbers = numbers.filter(
  //         (number) => number !== numberToBeDeleted
  //       );
  //       mutation.mutate(updatedNumbers as any);
  //     }
  //   },
  // });

  // const editNumberform = useForm({
  //   defaultValues: {
  //     phoneNumber: numberToBeEdited,
  //   },
  //   validators: {
  //     onSubmit: phoneNumber,
  //   },
  //   onSubmit: async ({ value }) => {
  //     setIsFormLoading(true);
  //     const updatedNumbers = [...numbers]; // Create a copy of the array
  //     const index = numbers.indexOf(numberToBeEdited);
  //     if (index !== -1) {
  //       updatedNumbers[index] = value.phoneNumber; // Replace the old number with the new one
  //       return await mutation.mutate(updatedNumbers as any);
  //     }
  //   },
  // });

  return (
    <>
      <ContentCard title={translations["componentTitle"]}>
        <div className="container mb-10">
          <AlertBanner message={translations["alertMessage"]} type="error" />
        </div>
        <div className="container mb-10">
          <AlertBanner
            message={translations["successMessage"]}
            type="success"
          />
        </div>
        <div className="w-full items-center justify-center">
          {isLoading && <WhatsAppNumbersLoading />}
          {Boolean(!isLoading && !whatsapps?.length) && (
            <div className="w-full flex flex-col items-center justify-center h-[100px]">
              <div className="border rounded-md py-5 px-7 text-center text-center">
                {!campaignId
                  ? translations["noCampaign"]
                  : translations["noData"]}
              </div>
            </div>
          )}
          <div className="flex flex-col w-full items-center justify-center">
            <Card className="w-full max-w-lg px-10 pb-10">
              <div className="mb-5">{translations["addNumberCtaLabel"]}</div>
              {/* <Form
                fieldsToRender={[
                  {
                    label:
                      translations["addNumberForm"]["fields"]["addNumber"][
                        "label"
                      ],
                    name: translations["addNumberForm"]["fields"]["addNumber"][
                      "name"
                    ],
                    placeholder:
                      translations["addNumberForm"]["fields"]["addNumber"][
                        "placeholder"
                      ],
                    type: "text",
                  },
                ]}
                form={addPhoneNameForm}
                isLoading={isFormLoading}
                submitLabel={translations["addNumberForm"]["submitLabel"]}
                submitLoadingLabel={
                  translations["addNumberForm"]["submitLoadingLabel"]
                }
              /> */}
            </Card>
          </div>
          <div className="h-[1px] border-b mt-10 mb-10" />
          {Boolean(!isLoading && whatsapps?.length) && (
            <div className="mb-5 mt-5">{translations["numbersRegistered"]}</div>
          )}
          {!isLoading && whatsapps?.length && (
            <div className="flex flex-col md:inline-grid md:grid-cols-2 md:gap-4 xl:inline-grid xl:grid-cols-3 xl:gap-4">
              {whatsapps.map((entry, index) => (
                <div key={index} className="mt-6">
                  <WhatsAppPhoneNumberCard
                    entry={entry}
                    translations={translations}
                    onEdit={(phoneNumber) => {
                      setNumberToBeEdited(phoneNumber);
                      setIsModalDeleteNumberOpen(false);
                      setIsModalEditNumberOpen(true);
                    }}
                    onDelete={(phoneNumber) => {
                      setNumberToBeDeleted(phoneNumber);
                      setIsModalDeleteNumberOpen(true);
                      setIsModalEditNumberOpen(false);
                    }}
                    onGenerateQrCode={handleShowQrCode}
                  />
                </div>
              ))}
            </div>
          )}
          {/* <UpdateWhatsappNumbersDialog
          form={editNumberform}
          isLoading={isFormLoading}
          isModalOpen={isModalEditNumberOpen}
          number={numberToBeEdited}
          setIsModalOpen={setIsModalEditNumberOpen}
          translations={translations}
        /> */}
          {/* <DeleteWhatsappNumbersDialog
          form={deleteNumberform}
          isLoading={isFormLoading}
          isModalOpen={isModalDeleteNumberOpen}
          number={numberToBeDeleted}
          setIsModalOpen={setIsModalDeleteNumberOpen}
          translations={translations}
        /> */}
          <WhatsappQRCodeDialog
            isModalOpen={isQrCodeModalOpen}
            setIsModalOpen={setIsQrCodeModalOpen}
            title={translations["qrCodeDialog"]["title"]}
            description={translations["qrCodeDialog"]["description"]}
            qrCodeUrl={currentPhoneQrCode || ""}
            translations={translations}
          />
        </div>
      </ContentCard>
    </>
  );
};

export default WhatsAppNumbers;
