"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "../../form";

const WhatsappEditNumbersDialog = ({
  form,
  isLoading,
  isModalOpen,
  number,
  setIsModalOpen,
  translate,
}: {
  form: any;
  isModalOpen: boolean;
  isLoading: boolean;
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
          <DialogTitle>{translate["editNumberDialog"]["title"]}</DialogTitle>
        </DialogHeader>
        <Form
          cancelButtonLabel="Cancelar"
          fieldsToRender={[
            {
              label: `${translate["editNumberDialog"]["form"]["fields"]["phoneNumber"]["label"]} ${number}`,
              name: translate["editNumberDialog"]["form"]["fields"][
                "phoneNumber"
              ]["name"],
              type: "countryPhone",
            },
          ]}
          isLoading={isLoading}
          onCancel={() => {
            setIsModalOpen(false);
            form.reset();
          }}
          form={form}
          submitLabel={translate["editNumberDialog"]["form"]["submitLabel"]}
          submitLoadingLabel={
            translate["editNumberDialog"]["form"]["submitLoadingLabel"]
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappEditNumbersDialog;
