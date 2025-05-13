import Form from "@/components/form";

const UserLoginForm = ({
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
        label: translations["fields"]["email"]["label"],
        name: translations["fields"]["email"]["name"],
        type: "email",
      },
      {
        label: translations["fields"]["password"]["label"],
        name: translations["fields"]["password"]["name"],
        type: "password",
      },
    ]}
    forgotPasswordLabel={translations["forgotPasswordLabel"]}
    form={form}
    submitLabel={translations["submitLabel"]}
    submitLoadingLabel={translations["submitLoadingLabel"]}
  />
);

export default UserLoginForm;
