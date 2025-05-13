import Form from "@/components/form";

const CreateAccountForm = ({
  form,
  translations,
}: {
  form: any;
  translations: any;
}) => (
  <Form
    createAccountLinkLabel={translations["createAccountLinkLabel"]}
    fieldsToRender={[
      {
        label: translations["fields"]["firstName"]["label"],
        name: translations["fields"]["firstName"]["name"],
        placeholder: translations["fields"]["firstName"]["placeholder"],
        type: "text",
      },
      {
        label: translations["fields"]["lastName"]["label"],
        name: translations["fields"]["lastName"]["name"],
        placeholder: translations["fields"]["lastName"]["placeholder"],
        type: "text",
      },
      {
        label: translations["fields"]["email"]["label"],
        name: translations["fields"]["email"]["name"],
        placeholder: translations["fields"]["email"]["placeholder"],
        type: "email",
      },
      {
        label: translations["fields"]["password"]["label"],
        name: translations["fields"]["password"]["name"],
        type: "password",
      },
      {
        disabled: true,
        label: translations["fields"]["plan"]["label"],
        name: translations["fields"]["plan"]["name"],
        type: "text",
      },
    ]}
    forgotPasswordLabel={translations["forgotPasswordLabel"]}
    form={form}
    makeLoginLabel={translations["makeLoginLabel"]}
    showPasswordRules
    submitLabel={translations["submitLabel"]}
    submitLoadingLabel={translations["submitLoadingLabel"]}
  />
);

export default CreateAccountForm;
