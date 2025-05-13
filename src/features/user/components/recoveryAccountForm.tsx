import Form from "@/components/form";

const RecoveryAccountForm = ({
  form,
  translations,
}: {
  form: any;
  translations: any;
}) => (
  <Form
    fieldsToRender={[
      {
        label: translations["fields"]["email"]["label"],
        name: translations["fields"]["email"]["name"],
        placeholder: translations["fields"]["email"]["placeholder"],
        type: "email",
      },
    ]}
    forgotPasswordLabel={translations["forgotPasswordLabel"]}
    form={form}
    makeLoginLabel={translations["makeLoginLabel"]}
    submitLabel={translations["submitLabel"]}
    submitLoadingLabel={translations["submitLoadingLabel"]}
  />
);

export default RecoveryAccountForm;
