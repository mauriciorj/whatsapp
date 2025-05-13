"use client";

import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "@/components/form";

const UpdateCampaignsDialog = ({
  form,
  isModalOpen,
  campaignToDialog,
  setIsModalOpen,
  translations,
}: {
  form: any;
  isModalOpen: boolean;
  campaignToDialog: any;
  setIsModalOpen: (value: boolean) => void;
  translations: any;
}) => {
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => {
        setIsModalOpen(false);
        form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translations["title"]}</DialogTitle>
        </DialogHeader>
        <Form
          cancelButtonLabel="Cancelar"
          fieldsToRender={[
            {
              label: `${translations["form"]["fields"]["campaignName"]["label"]}`,
              name: translations["form"]["fields"]["campaignName"]["name"],
              placeholder: campaignToDialog?.title,
              type: "text",
            },
            {
              label: `${translations["form"]["fields"]["campaignStartDate"]["label"]}`,
              name: translations["form"]["fields"]["campaignStartDate"]["name"],
              placeholder: campaignToDialog?.title,
              type: "datePicker",
            },
            {
              label: `${translations["form"]["fields"]["campaignEndDate"]["label"]}`,
              name: translations["form"]["fields"]["campaignEndDate"]["name"],
              placeholder: campaignToDialog?.title,
              type: "datePicker",
            },
          ]}
          onCancel={() => {
            setIsModalOpen(false);
            form.reset();
          }}
          form={form}
          submitLabel={translations["form"]["submitLabel"]}
          submitLoadingLabel={translations["form"]["submitLoadingLabel"]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCampaignsDialog;
