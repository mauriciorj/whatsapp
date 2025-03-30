"use client";

import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "../../../form";

const WhatsappDeleteNumbersDialog = ({
  form,
  isLoading,
  isModalOpen,
  number,
  setIsModalOpen,
  translate,
}: {
  form: any;
  isLoading: boolean;
  isModalOpen: boolean;
  number: any;
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
          <DialogTitle>{translate["deleteNumberDialog"]["title"]}</DialogTitle>
        </DialogHeader>
        {
          <div className="flex flex-col bg-destructive/30 px-3 py-3 rounded-lg mt-5 mb-2">
            <div className="flex flex-row w-full text-xl justify-center items-center text-destructive font-bold">
              <TriangleAlert className="mr-2" />
              {translate["deleteNumberDialog"]["alertBannerTitle"]}
            </div>
            <div className="w-full text-sm mt-2">
              {translate["deleteNumberDialog"]["alertBannerDescription"]}
            </div>
            <div className="w-full text-sm text-center font-bold mt-2">
              {translate["deleteNumberDialog"]["alertBannerFooter"]}
            </div>
          </div>
        }
        <DialogDescription>
          {translate["deleteNumberDialog"]["instruction"]}
        </DialogDescription>
        <Form
          cancelButtonLabel="Cancelar"
          fieldsToRender={[
            {
              label: `${translate["deleteNumberDialog"]["form"]["fields"]["deleteNumber"]["label"]} ${number}`,
              name: translate["deleteNumberDialog"]["form"]["fields"][
                "deleteNumber"
              ]["name"],
              placeholder: "deletar",
              type: "text",
            },
          ]}
          isDeleteForm
          isLoading={isLoading}
          onCancel={() => {
            setIsModalOpen(false);
            form.reset();
          }}
          form={form}
          submitLabel={translate["deleteNumberDialog"]["form"]["submitLabel"]}
          submitLoadingLabel={
            translate["deleteNumberDialog"]["form"]["submitLoadingLabel"]
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappDeleteNumbersDialog;
