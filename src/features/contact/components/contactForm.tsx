import Form from "@/components/form";

const ContactForm = ({
  form,
  translations,
}: {
  form: any;
  translations: any;
}) => (
  <Form
    fieldsToRender={[
      {
        label: translations["fields"]["name"]["label"],
        name: translations["fields"]["name"]["name"],
        type: "text",
      },
      {
        label: translations["fields"]["email"]["label"],
        name: translations["fields"]["email"]["name"],
        type: "email",
      },
      {
        label: translations["fields"]["subject"]["label"],
        name: translations["fields"]["subject"]["name"],
        type: "text",
      },
      {
        label: translations["fields"]["message"]["label"],
        name: translations["fields"]["message"]["name"],
        maxLength: 1000,
        type: "textArea",
      },
    ]}
    form={form}
    submitLabel={translations["submitLabel"]}
    submitLoadingLabel={translations["submitLoadingLabel"]}
  />
);

export default ContactForm;
