"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import pt from "react-phone-number-input/locale/pt";
import UpdateWhatsAppNumbers from "@/actions/updateWhatsAppNumbers/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BusinessRules from "@/lib/businessRules";
import { useMutation } from "@tanstack/react-query";
import WhatsAppNumbersLoading from "./loading";
import "./style.css";

type WhatsAppEntry = {
  number: string;
  message: string;
}[];

export function WhatsAppNumbers({
  isLoading,
  numbers,
  userInfo,
}: {
  isLoading: boolean;
  numbers: { number: string; message: string }[];
  userInfo: {
    plan: string;
    user_id: string;
  };
}) {
  const [entries, seEntries] = useState<WhatsAppEntry | null>(numbers);
  const [errorsMessages, setErrorsMessages] = useState<any>([]);
  const [isOnFocus, setIsOnFocus] = useState<number | null>(null);
  const [mutationError, setMutationError] = useState<boolean>(false);
  const [mutationSuccess, setMutationSuccess] = useState<boolean>(false);

  const maxNumbers = BusinessRules[userInfo?.plan]?.maxNumbers;

  const mutation = useMutation({
    mutationFn: (entries) =>
      UpdateWhatsAppNumbers({ entries, user_id: userInfo?.user_id } as any),
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
      if (entry.number && entry.message) {
        errors.push({ numberError });
      } else {
        if (!entry.number) {
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
      seEntries(entries.filter((_, i) => i !== index));
    }
  };

  const handleAdd = () => {
    const hasErrors = checkErrors();
    if (!hasErrors) {
      setMutationSuccess(false);
      setMutationError(false);
      if (!entries?.length) {
        seEntries([{ number: "", message: "" }]);
      } else {
      }
      if (entries?.length) {
        seEntries([...entries, { number: "", message: "" }]);
      }
    }
  };

  const handleUpdate = (index: number, field: string, value: string) => {
    setMutationSuccess(false);
    setMutationError(false);
    if (entries?.length) {
      const updatedEntries = entries.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      );
      seEntries(updatedEntries);
    }
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
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Numeros de WhatsApp</h2>
      {/* MOBILE VIEW */}
      <div className="w-full block visible md:hidden md:invisible">
        {isLoading && <WhatsAppNumbersLoading />}
        {Boolean(!entries?.length) && !isLoading && (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7">
              Você não tem nenhum número cadastrado!Por favor cadastre um número
              para começar.
            </div>
          </div>
        )}

        {!isLoading &&
          entries?.map((entry, index) => (
            <div key={index} className="mt-6">
              <div className="flex flex-col gap-4">
                <div className="w-full">
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
                    onChange={(e: any) => handleUpdate(index, "number", e)}
                    placeholder="Insira o número de telefone"
                    value={entry.number}
                  />
                </div>
                <div className="w-full flex flex-row">
                  <Button
                    className="w-[50px] mr-6"
                    onClick={() => handleRemove(index)}
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                  <Textarea
                    maxLength={200}
                    onBlur={() => setIsOnFocus(null)}
                    onChange={(e: any) =>
                      handleUpdate(index, "message", e.target.value)
                    }
                    onFocusCapture={() => setIsOnFocus(index)}
                    placeholder="Sua mensagem aqui..."
                    value={entry.message}
                  />
                </div>
              </div>
              <div className="w-full h-6 text-right pr-10 mt-2 text-sm">
                {isOnFocus === index && <>{entry.message?.length} / 200</>}
              </div>
              <div className="mt-1">
                <div className="flex gap-4">
                  <div className="w-full">
                    {errorsMessages[index] &&
                      errorsMessages[index]?.numberError && (
                        <p className="text-sm text-destructive">
                          {errorsMessages[index].numberError || ""}
                        </p>
                      )}
                  </div>
                  <div className="w-full">
                    {errorsMessages[index] &&
                      errorsMessages[index]?.messageError && (
                        <p className="text-sm text-destructive">
                          {errorsMessages[index].messageError || ""}
                        </p>
                      )}
                  </div>
                  <div className="w-[18px]"> </div>
                </div>
              </div>
            </div>
          ))}
        <div className="flex flex-row w-full justify-end mt-8">
          <div className="flex gap-4 items-center">
            <div className="">
              {mutationSuccess ? (
                <div className="text-success">Informações Salvas!</div>
              ) : null}
              {mutationError ? (
                <div className="text-destructive">
                  Ops... Algo deu erro. Por favor tente mais tarde.
                </div>
              ) : null}
            </div>
            {Boolean(!entries || entries?.length < maxNumbers) && (
              <Button onClick={handleAdd} variant="outline">
                <div className="flex flex-row items-center">
                  <span>Adicionar Número</span>{" "}
                  <Plus className="h-4 w-4 ml-2" />
                </div>
              </Button>
            )}
            <Button onClick={handleSave}>
              {mutation.isPending ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </div>
      </div>
      {/* DESKTOP VIEW */}
      <div className="hidden invisible md:block md:visible">
        {isLoading && <WhatsAppNumbersLoading />}
        {!entries?.length && !isLoading ? (
          <div className="flex flex-col w-full items-center py-5">
            <div className="px-8 py-5 text-center text-destructive font-bold border rounded-md text-DefaultCard-foreground shadow-sm">
              <p>Você não tem nenhum número cadastrado!</p>Por favor cadastre um
              número para começar.
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <div className="flex gap-4">
              <Label className="w-full">Numero de Celular *</Label>
              <Label className="w-full">Texto</Label>
              <div className="w-[18px]"> </div>
            </div>
          </div>
        )}
        {!isLoading &&
          entries?.map((entry, index) => (
            <div key={index} className="mt-6">
              <div className="flex gap-4">
                <div className="w-full">
                  <PhoneInput
                    countryCallingCodeEditable={false}
                    defaultCountry="BR"
                    flags={flags}
                    international
                    labels={pt}
                    numberInputProps={{
                      className:
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    }}
                    onChange={(e: any) => handleUpdate(index, "number", e)}
                    placeholder="Insira o número de telefone"
                    value={entry.number}
                  />
                </div>
                <Textarea
                  maxLength={200}
                  onBlur={() => setIsOnFocus(null)}
                  onChange={(e: any) =>
                    handleUpdate(index, "message", e.target.value)
                  }
                  onFocusCapture={() => setIsOnFocus(index)}
                  placeholder="Sua mensagem aqui..."
                  value={entry.message}
                />
                <Button
                  onClick={() => handleRemove(index)}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="w-full h-6 text-right pr-10 mt-2 text-sm">
                {isOnFocus === index && <>{entry.message?.length} / 200</>}
              </div>
              <div className="mt-1">
                <div className="flex gap-4">
                  <div className="w-full">
                    {errorsMessages[index] &&
                      errorsMessages[index]?.numberError && (
                        <p className="text-sm text-destructive">
                          {errorsMessages[index].numberError || ""}
                        </p>
                      )}
                  </div>
                  <div className="w-full">
                    {errorsMessages[index] &&
                      errorsMessages[index]?.messageError && (
                        <p className="text-sm text-destructive">
                          {errorsMessages[index].messageError || ""}
                        </p>
                      )}
                  </div>
                  <div className="w-[18px]"> </div>
                </div>
              </div>
            </div>
          ))}
        <div className="flex flex-row w-full justify-end mt-8">
          <div className="flex gap-4 items-center">
            <div className="">
              {mutationSuccess ? (
                <div className="text-success">Informações Salvas!</div>
              ) : null}
              {mutationError ? (
                <div className="text-destructive">
                  Ops... Algo deu erro. Por favor tente mais tarde.
                </div>
              ) : null}
            </div>
            {Boolean(!entries || entries?.length < maxNumbers) && (
              <Button onClick={handleAdd} variant="outline">
                <div className="flex flex-row items-center">
                  <span>Adicionar Número</span>{" "}
                  <Plus className="h-4 w-4 ml-2" />
                </div>
              </Button>
            )}
            <Button onClick={handleSave}>
              {mutation.isPending ? "Salvando..." : "Salvar alterações"}
            </Button>
            <div className="w-[18px]"> </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
