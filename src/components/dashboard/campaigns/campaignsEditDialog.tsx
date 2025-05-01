"use client";

import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "../../form";

const CampaignsEditDialog = ({
  form,
  isModalOpen,
  campaignToDialog,
  setIsModalOpen,
  translate,
}: {
  form: any;
  isModalOpen: boolean;
  campaignToDialog: any;
  setIsModalOpen: (value: boolean) => void;
  translate: any;
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
          <DialogTitle>{translate["title"]}</DialogTitle>
        </DialogHeader>
        <Form
          cancelButtonLabel="Cancelar"
          fieldsToRender={[
            {
              label: `${translate["form"]["fields"]["campaignName"]["label"]}`,
              name: translate["form"]["fields"]["campaignName"]["name"],
              placeholder: campaignToDialog?.title,
              type: "text",
            },
            {
              label: `${translate["form"]["fields"]["campaignStartDate"]["label"]}`,
              name: translate["form"]["fields"]["campaignStartDate"]["name"],
              placeholder: campaignToDialog?.title,
              type: "datePicker",
            },
            {
              label: `${translate["form"]["fields"]["campaignEndDate"]["label"]}`,
              name: translate["form"]["fields"]["campaignEndDate"]["name"],
              placeholder: campaignToDialog?.title,
              type: "datePicker",
            },
          ]}
          onCancel={() => {
            setIsModalOpen(false);
            form.reset();
          }}
          form={form}
          submitLabel={translate["form"]["submitLabel"]}
          submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CampaignsEditDialog;
