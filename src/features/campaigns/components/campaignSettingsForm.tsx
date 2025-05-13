import Form from "@/components/form";

const CampaignSettingsForm = ({
  form,
  translations,
}: {
  form: any;
  translations: any;
}) => (
  <Form
    fieldsToRender={[
      {
        label: translations["fields"]["campaignName"]["label"],
        name: translations["fields"]["campaignName"]["name"],
        type: "text",
      },
      {
        label: translations["fields"]["campaignDescription"]["label"],
        name: translations["fields"]["campaignDescription"]["name"],
        type: "text",
      },
      {
        label: translations["fields"]["startDate"]["label"],
        name: translations["fields"]["startDate"]["name"],
        type: "text",
      },
      {
        label: translations["fields"]["endDate"]["label"],
        name: translations["fields"]["endDate"]["name"],
        type: "text",
      },
      {
        label: translations["fields"]["leadsPerGroup"]["label"],
        name: translations["fields"]["leadsPerGroup"]["name"],
        type: "text",
      },
      {
        label: translations["fields"]["sameLeadsInGroups"]["label"],
        name: translations["fields"]["sameLeadsInGroups"]["name"],
        type: "text",
      },
      {
        label: translations["fields"]["redirectLink"]["label"],
        name: translations["fields"]["redirectLink"]["name"],
        type: "text",
      },
    ]}
    form={form}
    submitLabel="Salvar"
    submitLoadingLabel="Salvando..."
  />
);

export default CampaignSettingsForm;
