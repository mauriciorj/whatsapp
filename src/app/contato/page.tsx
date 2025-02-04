"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import ContactWebForm from "@/actions/contactWebForm/actions";
import AuthCard from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";

export default function Contato() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);

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
      setIsLoading(true);
      try {
        const response = await ContactWebForm(
          value as {
            email: string;
            subject: string;
            name: string;
            message: string;
          }
        );
        if (response === false) {
          setIsServerError(true);
          setIsLoading(false);
        } else {
          setIsServerError(false);
          setIsSubmitted(true);
          setIsLoading(false);
        }
      } catch {
        setIsServerError(true);
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="pt-14 pb-16 px-4">
      <AuthCard>
        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Entre em contato</h1>
              <p className="text-muted-foreground">
                Alguma dúvida ou Sugestão? Ficaremos felizes em ajudar!
              </p>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <div className="space-y-2">
                <form.Field name="name">
                  {(field) => (
                    <>
                      <Label htmlFor="firstName">Nome *</Label>
                      <Input
                        id="name"
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
                        maxLength={50}
                        placeholder="Nome"
                        required
                        type="text"
                        value={field.state.value}
                      />
                      {field.state.meta.errors && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </>
                  )}
                </form.Field>
              </div>
              <div className="space-y-2 relative">
                <form.Field name="email">
                  {(field) => (
                    <>
                      <Label htmlFor="firstName">Email *</Label>
                      <Input
                        id="email"
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
                        placeholder="seuemail@exemplo.com"
                        required
                        type="email"
                        value={field.state.value}
                      />
                      {field.state.meta.errors && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </>
                  )}
                </form.Field>
              </div>
              <div className="space-y-2 relative">
                <form.Field name="subject">
                  {(field) => (
                    <>
                      <Label htmlFor="firstName">
                        Dúvida, Assunto ou Sugestão *
                      </Label>
                      <Input
                        id="subject"
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
                        maxLength={200}
                        placeholder="Tópico em poucas palavras..."
                        required
                        type="text"
                        value={field.state.value}
                      />
                      {field.state.meta.errors && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </>
                  )}
                </form.Field>
              </div>
              <div className="space-y-2 relative">
                <form.Field name="message">
                  {(field) => (
                    <>
                      <Label htmlFor="firstName">Mensagem *</Label>
                      <Textarea
                        id="message"
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
                        maxLength={1000}
                        placeholder="Sua mensagem..."
                        required
                        value={field.state.value}
                      />
                      {field.state.meta.errors && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </>
                  )}
                </form.Field>
              </div>
              <Button
                className="w-full"
                disabled={isLoading || isServerError}
                type="submit"
              >
                {isLoading ? (
                  <div className="flex flex-row items-center italic">
                    Enviando...
                    <LoaderCircle className="animate-spin h-5 w-5 ml-2" />
                  </div>
                ) : (
                  "Enviar Mensagem"
                )}
              </Button>
            </form>
            {isServerError && (
              <p className="text-sm text-destructive">
                Ops... algo deu errado. Por favor tente novamente mais tarde.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Mensagem Enviada!</h2>
            <p className="text-muted-foreground">
              Obrigado por entrar em contato. Retornaremos o mais rápido
              possível.
            </p>
            <Button
              className="w-full"
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
              variant="outline"
            >
              Enviar Outra Mensagem
            </Button>
          </div>
        )}
      </AuthCard>
    </div>
  );
}
