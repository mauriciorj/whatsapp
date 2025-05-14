"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, LoaderCircle } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import pt from "react-phone-number-input/locale/pt";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PasswordRulesValidation from "@/lib/passwordRulesValidation";
import type { FieldApi } from "@tanstack/react-form";
import Email from "./email";
import Textarea from "./textArea";
import Password from "./password";
import Text from "./text";
import FileUpload from "./file";

const Form = ({
  cancelButtonLabel,
  createAccountLinkLabel,
  fieldsToRender,
  forgotPasswordLabel,
  form,
  isDeleteForm,
  isLoading,
  makeLoginLabel,
  onCancel,
  onChange,
  showPasswordRules,
  submitLabel,
  submitLoadingLabel,
}: any) => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [passwordValidation, setPasswordValidation] = useState<any>({
    rule1: false,
    rule2: false,
    rule3: false,
    rule4: false,
    rule5: false,
  });

  function FieldInfo({
    field,
    fieldToRender,
  }: {
    field: FieldApi<any, any, any, any>;
    fieldToRender: any;
  }) {
    return (
      <>
        {field.state.meta.errors ? (
          <div
            className={`text-red-500 text-sm italic mt-1 ${
              fieldToRender.type === "countryPhone" ? "ml-[65px]" : null
            }`}
          >
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
        {fieldsToRender?.map((fieldToRender: any, index: any) => (
          <form.Field
            name={fieldToRender.name}
            key={`${fieldToRender.name}-${index}`}
          >
            {(field: any) => {
              return (
                <div className="space-y-2">
                  {fieldToRender.type === "datePicker" && (
                    <div className="w-full flex flex-row items-center">
                      <Label htmlFor={field.name}>{fieldToRender.label}</Label>
                      <DatePicker
                        showIcon
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        icon={<CalendarDays />}
                      />
                    </div>
                  )}
                  {fieldToRender.type === "textArea" && (
                    <>
                      <Label htmlFor={field.name}>{fieldToRender.label}</Label>
                      <Textarea
                        field={field}
                        fieldToRender={fieldToRender}
                        isLoading={form.state.isSubmitting || isLoading}
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
                      isLoading={form.state.isSubmitting || isLoading}
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
                      isLoading={form.state.isSubmitting || isLoading}
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
                        return onChange;
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
                      isLoading={form.state.isSubmitting || isLoading}
                      onBlur={field.handleBlur}
                      onChange={(e: { target: { value: string } }) => {
                        field.handleChange(e.target.value);
                      }}
                    />
                  )}
                  {fieldToRender.type === "file" && (
                    <FileUpload
                      field={field}
                      fieldToRender={fieldToRender}
                      isLoading={form.state.isSubmitting || isLoading}
                      onBlur={field.handleBlur}
                      onChange={(files) => {
                        if (files && files.length > 0) {
                          field.handleChange(files[0]);
                        }
                      }}
                    />
                  )}
                  {fieldToRender.type === "countryPhone" && (
                    <>
                      <Label className="text-base" htmlFor={field.name}>
                        {fieldToRender.label}
                      </Label>
                      <div className="pt-3">
                        <PhoneInput
                          countryCallingCodeEditable={false}
                          defaultCountry="BR"
                          disabled={form.state.isSubmitting || isLoading}
                          flags={flags}
                          id={field.name}
                          international
                          labels={pt}
                          name={field.name}
                          numberInputProps={{
                            className:
                              "flex h-10 w-full bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                          }}
                          onChange={(e: any) => {
                            field.handleChange(e);
                          }}
                          placeholder={fieldToRender.placeholder}
                          value={field.state.value}
                        />
                      </div>
                    </>
                  )}
                  <FieldInfo field={field} fieldToRender={fieldToRender} />
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
            className={`w-full ${isDeleteForm ? "bg-destructive" : null}`}
            disabled={form.state.isSubmitting || isLoading}
            type="submit"
          >
            {form.state.isSubmitting || isLoading ? (
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
          disabled={form.state.isSubmitting || isLoading}
          onClick={() => onCancel()}
          variant="outline"
        >
          {cancelButtonLabel}
        </Button>
      )}
    </>
  );
};

export default Form;
