"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import WhatsAppNumbersLoading from "./loading";
import "./style.css";
import WhatsappDeleteNumbersDialog from "./whatsappDeleteNumbersDialog";
import WhatsappEditNumbersDialog from "./whatsappEditNumbersDialog";
import Form from "@/components/form";
import DefaultCard from "@/components/layout/defaultCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTranslations from "@/hooks/useTranslations";
import BusinessRules from "@/lib/businessRules";
import { deleteDialogSchema, phoneNumber } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

export function WhatsAppNumbers({
  isLoading,
  numbers,
  campaignId,
  refetch,
  userPlan,
}: {
  isLoading: boolean;
  numbers: string[];
  campaignId: string;
  refetch: () => void;
  userPlan: string;
}) {
  const translate = useTranslations("Pages.Dashboard.Whatsapp.NumberComponent");

  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const [numberToBeEdited, setNumberToBeEdited] = useState<any>(null);
  const [numberToBeDeleted, setNumberToBeDeleted] = useState<any>(null);

  const [isModalEditNumberOpen, setIsModalEditNumberOpen] =
    useState<boolean>(false);
  const [isModalDeleteNumberOpen, setIsModalDeleteNumberOpen] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const maxNumbers = BusinessRules[userPlan]?.maxNumbers;

  const mutation = useMutation({
    mutationFn: async (entries) => {
      setErrorMessage(null);
      setSuccessMessage(null);

      // CLIENT SIDE
      const supabase = await createClient();
      const { error } = await supabase
        .from("campaigns")
        .update({ wp_numbers: entries })
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
      setIsModalEditNumberOpen(false);
      setIsModalDeleteNumberOpen(false);
      addNumberform.reset();
      deleteNumberform.reset();
      editNumberform.reset();
      return setErrorMessage(translate["alertMessage"]);
    },
    onSuccess: () => {
      setIsFormLoading(false);
      setIsModalEditNumberOpen(false);
      setIsModalDeleteNumberOpen(false);
      addNumberform.reset();
      deleteNumberform.reset();
      editNumberform.reset();
      refetch();
      return setSuccessMessage(translate["successMessage"]);
    },
  });

  const addNumberform = useForm({
    defaultValues: {
      phoneNumber: "",
    },
    validators: {
      onSubmit: phoneNumber,
    },
    onSubmit: async ({ value }) => {
      setIsFormLoading(true);
      if (!numbers) {
        return await mutation.mutate([value?.phoneNumber] as any);
      }
      const getNumbers = numbers;
      getNumbers.push(value?.phoneNumber);
      return await mutation.mutate(getNumbers as any);
    },
  });

  const deleteNumberform = useForm({
    defaultValues: {
      deleteWord: "",
    },
    validators: {
      onSubmit: deleteDialogSchema,
    },
    onSubmit: async ({ value }) => {
      setIsFormLoading(true);
      if (value?.deleteWord === "deletar") {
        const updatedNumbers = numbers.filter(
          (number) => number !== numberToBeDeleted
        );
        mutation.mutate(updatedNumbers as any);
      }
    },
  });

  const editNumberform = useForm({
    defaultValues: {
      phoneNumber: numberToBeEdited,
    },
    validators: {
      onSubmit: phoneNumber,
    },
    onSubmit: async ({ value }) => {
      setIsFormLoading(true);
      const updatedNumbers = [...numbers]; // Create a copy of the array
      const index = numbers.indexOf(numberToBeEdited);
      if (index !== -1) {
        updatedNumbers[index] = value.phoneNumber; // Replace the old number with the new one
        return await mutation.mutate(updatedNumbers as any);
      }
    },
  });

  return (
    <DefaultCard title={translate["componentTitle"]}>
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
        {Boolean(!numbers?.length || numbers?.length < maxNumbers) && (
          <div className="mt-6">
            <div className="mb-5">{translate["addNumberCtaLabel"]}</div>
            <Form
              fieldsToRender={[
                {
                  label:
                    translate["addNumberForm"]["fields"]["addNumber"]["label"],
                  name: translate["addNumberForm"]["fields"]["addNumber"][
                    "name"
                  ],
                  placeholder:
                    translate["addNumberForm"]["fields"]["addNumber"][
                      "placeholder"
                    ],
                  type: "countryPhone",
                },
              ]}
              form={addNumberform}
              isLoading={isFormLoading}
              submitLabel={translate["addNumberForm"]["submitLabel"]}
              submitLoadingLabel={
                translate["addNumberForm"]["submitLoadingLabel"]
              }
            />
            <div className="h-[1px] border-b mt-6 mb-6" />
          </div>
        )}
        {isLoading && <WhatsAppNumbersLoading />}
        {Boolean(!isLoading && !numbers?.length) && (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7 text-center text-center">
              {!campaignId ? translate["noCampaign"] : translate["noData"]}
            </div>
          </div>
        )}
        {Boolean(!isLoading && numbers?.length) && (
          <div className="mb-5">{translate["numbersRegistered"]}</div>
        )}
        {!isLoading &&
          numbers?.map((entry, index) => (
            <div key={index} className="mt-6">
              <div className="w-full flex flex-row">
                <Input disabled readOnly value={entry} />
                <Button
                  className="w-[100px] ml-5 px-5"
                  onClick={() => {
                    setNumberToBeEdited(entry);
                    setIsModalDeleteNumberOpen(false);
                    setIsModalEditNumberOpen(true);
                  }}
                  size="icon"
                  variant="outline"
                >
                  {translate["numbersUpdateCta"]}
                </Button>
                <Button
                  className="w-[50px] mr-2"
                  onClick={() => {
                    setNumberToBeDeleted(entry);
                    setIsModalDeleteNumberOpen(true);
                    setIsModalEditNumberOpen(false);
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        <WhatsappEditNumbersDialog
          form={editNumberform}
          isLoading={isFormLoading}
          isModalOpen={isModalEditNumberOpen}
          number={numberToBeEdited}
          setIsModalOpen={setIsModalEditNumberOpen}
          translate={translate}
        />
        <WhatsappDeleteNumbersDialog
          form={deleteNumberform}
          isLoading={isFormLoading}
          isModalOpen={isModalDeleteNumberOpen}
          number={numberToBeDeleted}
          setIsModalOpen={setIsModalDeleteNumberOpen}
          translate={translate}
        />
      </div>
    </DefaultCard>
  );
}
