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

const ProjectsDialog = ({
  form,
  isModalOpen,
  projectToBeDeleted,
  setIsModalOpen,
  translate,
}: {
  form: any;
  isModalOpen: boolean;
  projectToBeDeleted: any;
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
        <div className="flex flex-col bg-destructive/30 px-3 py-3 rounded-lg mt-5 mb-2">
          <div className="flex flex-row w-full text-xl justify-center items-center text-destructive font-bold">
            <TriangleAlert className="mr-2" />
            {translate["alertBannerTitle"]}
          </div>
          <div className="w-full text-sm mt-2">
            {translate["alertBannerDescription"]}
          </div>
          <div className="w-full text-sm text-center font-bold mt-2">
            {translate["alertBannerFooter"]}
          </div>
        </div>
        <DialogDescription>{translate["instruction"]}</DialogDescription>
        <Form
          cancelButtonLabel="Cancelar"
          fieldsToRender={[
            {
              label: `${translate["form"]["fields"]["deleteProject"]["label"]} ${projectToBeDeleted?.title}`,
              name: translate["form"]["fields"]["deleteProject"]["name"],
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
          submitLabel={translate["form"]["submitLabel"]}
          submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsDialog;
