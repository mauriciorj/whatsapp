import Form from "@/components/form";

const CreateCampaignsForm = ({
  form,
  translations,
}: {
  form: any;
  translations: any;
}) => (
  <Form
    fieldsToRender={[
      {
        countChar: true,
        countCharMaxChar: 50,
        label: translations["fields"]["campaign"]["label"],
        maxLength: 50,
        name: translations["fields"]["campaign"]["name"],
        placeholder: translations["fields"]["campaign"]["placeholder"],
        type: "text",
      },
    ]}
    form={form}
    submitLabel={translations["submitLabel"]}
    submitLoadingLabel={translations["submitLoadingLabel"]}
  />
);

export default CreateCampaignsForm;
