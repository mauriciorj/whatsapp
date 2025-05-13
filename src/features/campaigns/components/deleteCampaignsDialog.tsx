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

const DeleteCampaignsDialog = ({
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
        <div className="flex flex-col bg-destructive/30 px-3 py-3 rounded-lg mt-5 mb-2">
          <div className="flex flex-row w-full text-xl justify-center items-center text-destructive font-bold">
            <TriangleAlert className="mr-2" />
            {translations["alertBannerTitle"]}
          </div>
          <div className="w-full text-sm mt-2">
            {translations["alertBannerDescription"]}
          </div>
          <div className="w-full text-sm text-center font-bold mt-2">
            {translations["alertBannerFooter"]}
          </div>
        </div>
        <DialogDescription>{translations["instruction"]}</DialogDescription>
        <Form
          cancelButtonLabel="Cancelar"
          fieldsToRender={[
            {
              label: `${translations["form"]["fields"]["deleteCampaign"]["label"]} ${campaignToDialog?.title}`,
              name: translations["form"]["fields"]["deleteCampaign"]["name"],
              placeholder: "deletar",
              type: "text",
            },
          ]}
          isDeleteForm
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

export default DeleteCampaignsDialog;
