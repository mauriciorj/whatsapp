"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ClipboardCopy,
  Fingerprint,
  LoaderCircle,
  RefreshCcw,
} from "lucide-react";
import DefaultCard from "@/components/layout/defaultCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { linkSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

const WhatsAppLink = ({
  isLoading,
  link,
}: {
  isLoading: boolean;
  link: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  const [linkPersonalized, setLinkPersonalized] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const baseLink = link ? `https://zaprouter.pro/wp/${link}` : "";

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(baseLink);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  const form = useForm({
    defaultValues: {
      myLinkPersonalized: "",
    },
    validators: {
      onSubmit: linkSchema,
    },
    onSubmit: async ({ value }: any) => {
      console.log("value => ", value);
    },
  });

  const isFetching = false;
  return (
    <div className="mb-10">
      <DefaultCard>
        <h2 className="text-xl font-semibold mb-4">Link de divulgação</h2>
        <div className="flex gap-4">
          <div className="w-full relative">
            {isLoading && (
              <div className="absolute left-3 top-2">
                <Skeleton className="h-6 w-[270px]" />
              </div>
            )}
            <Input
              className="font-mono"
              id="myWhatsAppLink"
              readOnly
              value={`${baseLink}`}
            />
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="absolute right-[60px] top-[10px] cursor-pointer text-center justify-center"
                >
                  <Fingerprint
                    className={`${isFetching ? "animate-spin" : null} h-5 w-5`}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Personalize o seu link
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Tenha um link da sua maneira
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  // onClick={() => refetch()}
                  className="absolute right-[35px] top-[10px] cursor-pointer text-center justify-center"
                >
                  <RefreshCcw
                    className={`${isFetching ? "animate-spin" : null} h-5 w-5`}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Gere um link aleatório
                  </h4>
                </div>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  className="absolute right-[10px] top-[10px] cursor-pointer text-center justify-center"
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <ClipboardCopy className="h-5 w-5" />
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Copie o seu link</h4>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </DefaultCard>
      <Dialog
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          form.reset();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Personalize o seu link</DialogTitle>
            <DialogDescription>
              Por favor insira o seu link abaixo e confirme se está disponível.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row">
            <div className="text-sm text-muted-foreground">
              https://zaprouter.pro/wp/
            </div>
            <div className="text-sm bold">{linkPersonalized}</div>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="myLinkPersonalized">Link</Label>
              <form.Field name="myLinkPersonalized">
                {(field) => (
                  <>
                    <Input
                      id="myLinkPersonalized"
                      maxLength={30}
                      onBlur={() => setIsOnFocus(false)}
                      onChange={(e: any) => {
                        const re = /^[A-Za-z\b-]+$/;
                        if (e.target.value === "" || re.test(e.target.value)) {
                          field.handleChange(e.target.value.toLowerCase());
                          setLinkPersonalized(e.target.value.toLowerCase());
                        }
                      }}
                      onFocusCapture={() => setIsOnFocus(true)}
                      placeholder="seu-link"
                      required
                      type="text"
                      value={field.state.value}
                    />
                    <div className="flex flex-row items-center">
                      <div className="w-full h-6">
                        {field.state.meta.errors && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                      <div className="w-full h-6 text-right text-sm">
                        {isOnFocus &&
                          linkPersonalized &&
                          linkPersonalized?.length > 0 && (
                            <>{linkPersonalized?.length} / 50</>
                          )}
                      </div>
                    </div>
                  </>
                )}
              </form.Field>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button disabled={form.state.isSubmitting} type="submit">
                {form.state.isSubmitting ? (
                  <div className="flex flex-row items-center italic">
                    Checando...
                    <LoaderCircle className="animate-spin h-5 w-5 ml-2" />
                  </div>
                ) : (
                  "Checar disponibilidade"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhatsAppLink;
