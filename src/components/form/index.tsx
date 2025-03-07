"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PasswordRulesValidation from "@/lib/passwordRulesValidation";
import type { FieldApi } from "@tanstack/react-form";
import Email from "./email";
import Textarea from "./textArea";
import Password from "./password";
import Text from "./text";

export default function Form({
  cancelButtonLabel,
  createAccountLinkLabel,
  fieldsToRender,
  forgotPasswordLabel,
  form,
  makeLoginLabel,
  onCancel,
  onChange,
  showPasswordRules,
  submitLabel,
  submitLoadingLabel,
}: any) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [passwordValidation, setPasswordValidation] = useState<any>({
    rule1: false,
    rule2: false,
    rule3: false,
    rule4: false,
    rule5: false,
  });

  function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
      <>
        {field.state.meta.errors ? (
          <div className="text-red-500 text-sm italic mt-1">
            {field.state.meta.errors}
          </div>
        ) : null}
        {field.state.meta.isValidating ? "Validating..." : null}
      </>
    );
  }

  return (
    <>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {fieldsToRender?.map((fieldToRender: any) => (
          <form.Field name={fieldToRender.name} key={fieldToRender.name}>
            {(field: any) => {
              return (
                <div className="space-y-2">
                  {fieldToRender.type === "textArea" && (
                    <>
                      <Label htmlFor={field.name}>{fieldToRender.label}</Label>
                      <Textarea
                        field={field}
                        fieldToRender={fieldToRender}
                        isLoading={form.state.isSubmitting}
                        onBlur={field.handleBlur}
                        onChange={(e: { target: { value: string } }) => {
                          field.handleChange(e.target.value);
                        }}
                      />
                    </>
                  )}
                  {fieldToRender.type === "password" && (
                    <Password
                      field={field}
                      fieldToRender={fieldToRender}
                      isLoading={form.state.isSubmitting}
                      isShowPassword={isShowPassword}
                      onBlur={field.handleBlur}
                      onChange={(e: any) => {
                        field.handleChange(e.target.value);
                        const checkRules = PasswordRulesValidation(
                          e.target.value
                        );
                        setPasswordValidation((prevState: any) => ({
                          ...prevState,
                          ...checkRules,
                        }));
                      }}
                      passwordValidation={passwordValidation}
                      setIsShowPassword={setIsShowPassword}
                      showPasswordRules={showPasswordRules}
                    />
                  )}
                  {fieldToRender.type === "text" && (
                    <Text
                      field={field}
                      fieldToRender={fieldToRender}
                      isLoading={form.state.isSubmitting}
                      onBlur={field.handleBlur}
                      onChange={(e: any) => {
                        if (fieldToRender?.isPersonalizedLink) {
                          const re = /^[A-Za-z\b-]+$/;
                          if (
                            e?.target?.value === "" ||
                            re.test(e?.target?.value)
                          ) {
                            field.handleChange(e.target.value.toLowerCase());
                          }
                        } else {
                          field.handleChange(e.target.value);
                        }
                        onChange(e.target.value);
                      }}
                      // onChange={(e: { target: { value: string } }) => {
                      //   field.handleChange(e.target.value);
                      // }}
                    />
                  )}
                  {fieldToRender.type === "email" && (
                    <Email
                      field={field}
                      fieldToRender={fieldToRender}
                      isLoading={form.state.isSubmitting}
                      onBlur={field.handleBlur}
                      onChange={(e: { target: { value: string } }) => {
                        field.handleChange(e.target.value);
                      }}
                    />
                  )}
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>
        ))}
        {forgotPasswordLabel && (
          <div className="text-right">
            <Link
              className="text-sm text-primary hover:underline"
              href="/recuperar-senha"
            >
              {forgotPasswordLabel}
            </Link>
          </div>
        )}
        {submitLabel && (
          <Button
            className="w-full"
            disabled={form.state.isSubmitting}
            type="submit"
          >
            {form.state.isSubmitting ? (
              <div className="flex flex-row items-center italic">
                {submitLoadingLabel}
                <LoaderCircle className="animate-spin h-5 w-5 ml-2" />
              </div>
            ) : (
              submitLabel
            )}
          </Button>
        )}
        {createAccountLinkLabel && (
          <div className="text-center text-sm">
            <Link className="text-primary hover:underline" href="/#planos">
              {createAccountLinkLabel}
            </Link>
          </div>
        )}
        {makeLoginLabel && (
          <div className="text-center text-sm">
            <Link className="text-primary hover:underline" href="/login">
              {makeLoginLabel}
            </Link>
          </div>
        )}
      </form>
      {cancelButtonLabel && (
        <Button
          className="w-full mt-3"
          disabled={form.state.isSubmitting}
          onClick={() => onCancel()}
          variant="outline"
        >
          {cancelButtonLabel}
        </Button>
      )}
    </>
  );
}
