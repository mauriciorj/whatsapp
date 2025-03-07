"use client";

import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { Plus, Trash2 } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import pt from "react-phone-number-input/locale/pt";
import WhatsAppNumbersLoading from "./loading";
import "./style.css";
// import UpdateWhatsAppNumbers from "@/actions/updateWhatsAppNumbers/actions";
import DefaultCard from "@/components/layout/defaultCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import useTranslations from "@/hooks/useTranslations";
import BusinessRules from "@/lib/businessRules";
import { createClient } from "@/supabase/client";
import { useMutation } from "@tanstack/react-query";

export function WhatsAppNumbers({
  isLoading,
  numbers,
  projectId,
  refetch,
  userPlan,
}: {
  isLoading: boolean;
  numbers: string[];
  projectId: string;
  refetch: () => void;
  userPlan: string;
}) {
  const translate = useTranslations("Pages.Dashboard.Whatsapp.NumberComponent");

  const [entries, setEntries] = useState<string[] | null>();
  const [isAddingNewNumber, setIsAddingNewNumber] = useState<boolean>(false);
  const [isShowSaveButton, setIsShowSaveButton] = useState<boolean>(false);
  const [errorsMessages, setErrorsMessages] = useState<any>([]);
  console.log("errorsMessages", errorsMessages);
  const [mutationError, setMutationError] = useState<boolean>(false);
  const [mutationSuccess, setMutationSuccess] = useState<boolean>(false);

  const maxNumbers = BusinessRules[userPlan]?.maxNumbers;

  useEffect(() => {
    if (!isLoading && !isEqual(entries, numbers)) {
      setIsShowSaveButton(true);
    } else {
      setIsShowSaveButton(false);
    }
  }, [entries, isLoading, numbers]);

  useEffect(() => {
    setEntries(numbers);
  }, [numbers]);

  const mutation = useMutation({
    mutationFn: async (entries) => {
      setMutationError(false);
      setMutationSuccess(false);

      // CLIENT SIDE
      const supabase = await createClient();
      const { error } = await supabase
        .from("projects")
        .update({ wp_numbers: entries })
        .eq("id", projectId);

      if (error) {
        setMutationError(true);
      } else {
        refetch();
        setIsAddingNewNumber(false);
        setMutationSuccess(true);
      }

      // SERVER SIDE
      // UpdateWhatsAppNumbers({ entries, user_id: userPlan?.user_id } as any)
    },
    onError: () => {
      setMutationError(true);
    },
    onSuccess: () => {
      setMutationSuccess(true);
    },
  });

  const checkErrors = () => {
    let hasError = false;
    const errors: any = [];
    entries?.map((entry) => {
      let numberError = null;
      if (entry?.length) {
        errors.push({ numberError });
      } else {
        if (!entry?.length) {
          numberError = "Número obrigatório";
          hasError = true;
        }
        errors.push({ numberError });
      }
    });
    setErrorsMessages(errors);
    return hasError;
  };

  const handleRemove = (index: number) => {
    setMutationSuccess(false);
    setMutationError(false);
    if (entries?.length) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };

  const handleAdd = () => {
    const hasErrors = checkErrors();
    if (!hasErrors) {
      setIsAddingNewNumber(true);
      setMutationSuccess(false);
      setMutationError(false);
      if (!entries?.length) {
        setEntries([""]);
      } else {
      }
      if (entries?.length) {
        setEntries([...entries, ""]);
      }
    }
  };

  const handleUpdate = (index: number, value: string) => {
    setMutationSuccess(false);
    setMutationError(false);
    const entriesCopy = entries?.length ? entries : [];
    entriesCopy[index] = value;
    setEntries([...entriesCopy]);
  };

  const handleSave = () => {
    setMutationSuccess(false);
    setMutationError(false);
    const hasErrors = checkErrors();
    if (!hasErrors) {
      mutation.mutate(entries as any);
    }
  };

  return (
    <DefaultCard title={translate["componentTitle"]}>
      {mutationError && (
        <div className="container mb-10">
          <AlertBanner message={translate["alertMessage"]} type="error" />
        </div>
      )}
      {mutationSuccess && (
        <div className="container mb-10">
          <AlertBanner message={translate["successMessage"]} type="success" />
        </div>
      )}
      <div className="w-full">
        {isLoading && <WhatsAppNumbersLoading />}
        {Boolean(!entries?.length) && !isLoading && (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7 text-center text-center">
              {!projectId ? translate["noProject"] : translate["noData"]}
            </div>
          </div>
        )}
        {!isLoading &&
          entries?.map((entry, index) => (
            <div key={index} className="mt-6">
              <div className="w-full flex flex-row">
                <PhoneInput
                  countryCallingCodeEditable={false}
                  defaultCountry="BR"
                  flags={flags}
                  international
                  labels={pt}
                  numberInputProps={{
                    className:
                      "flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  }}
                  onChange={(e: any) => handleUpdate(index, e)}
                  placeholder={translate["placeholder"]}
                  value={entry}
                />
                <Button
                  className="w-[50px]"
                  onClick={() => handleRemove(index)}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </div>
              <div className="w-full mt-2 ml-[65px]">
                {errorsMessages[index] &&
                  errorsMessages[index]?.numberError?.length && (
                    <p className="text-sm text-destructive">
                      {errorsMessages[index].numberError || ""}
                    </p>
                  )}
              </div>
            </div>
          ))}
        <div className="flex flex-row w-full justify-end mt-8">
          <div className="flex gap-4 items-center">
            {Boolean(
              !isAddingNewNumber && (!entries || entries?.length < maxNumbers)
            ) && (
              <Button onClick={() => handleAdd()} variant="outline">
                <div className="flex flex-row items-center">
                  <span>{translate["addNumberCtaLabel"]}</span>{" "}
                  <Plus className="h-4 w-4 ml-2" />
                </div>
              </Button>
            )}
            {isShowSaveButton && (
              <Button
                variant="outline"
                onClick={() => {
                  setEntries(numbers);
                  setIsShowSaveButton(false);
                  setIsAddingNewNumber(false);
                }}
              >
                {translate["cancelCtaLabel"]}
              </Button>
            )}
            {isShowSaveButton && (
              <Button onClick={() => handleSave()}>
                {mutation.isPending
                  ? translate["saveCtaLoadingLabel"]
                  : translate["saveCtaLabel"]}
              </Button>
            )}
          </div>
        </div>
      </div>
    </DefaultCard>
  );
}
