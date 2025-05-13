import Form from "@/components/form";

const UpdateAccountForm = ({
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
        label: translations["fields"]["password"]["label"],
        name: translations["fields"]["password"]["name"],
        type: "password",
      },
    ]}
    forgotPasswordLabel={translations["forgotPasswordLabel"]}
    form={form}
    showPasswordRules
    submitLabel={translations["submitLabel"]}
    submitLoadingLabel={translations["submitLoadingLabel"]}
  />
);

export default UpdateAccountForm;
