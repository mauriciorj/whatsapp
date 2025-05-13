"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "@/components/form";

const UpdateWhatsappNumbersDialog = ({
  form,
  isLoading,
  isModalOpen,
  number,
  setIsModalOpen,
  translations,
}: {
  form: any;
  isModalOpen: boolean;
  isLoading: boolean;
  number: any;
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
          <DialogTitle>{translations["editNumberDialog"]["title"]}</DialogTitle>
        </DialogHeader>
        <Form
          cancelButtonLabel="Cancelar"
          fieldsToRender={[
            {
              label: `${translations["editNumberDialog"]["form"]["fields"]["phoneNumber"]["label"]} ${number}`,
              name: translations["editNumberDialog"]["form"]["fields"][
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
          submitLabel={translations["editNumberDialog"]["form"]["submitLabel"]}
          submitLoadingLabel={
            translations["editNumberDialog"]["form"]["submitLoadingLabel"]
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWhatsappNumbersDialog;
