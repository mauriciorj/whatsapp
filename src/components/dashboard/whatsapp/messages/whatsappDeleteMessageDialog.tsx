import Form from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function WhatsappDeleteMessageDialog({
  isModalOpen,
  setIsModalOpen,
  form,
  isLoading,
  message,
  translate,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  form: any;
  isLoading: boolean;
  message: any;
  translate: any;
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translate["deleteDialogTitle"]}</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-500 mb-4">
          {translate["deleteMessageFormWarning"]} <b>{message?.title}</b>
        </div>
        <Form
          fieldsToRender={[
            {
              label:
                translate["deleteMessageForm"]["fields"]["deleteWord"]["label"],
              name: translate["deleteMessageForm"]["fields"]["deleteWord"][
                "name"
              ],
              placeholder:
                translate["deleteMessageForm"]["fields"]["deleteWord"][
                  "placeholder"
                ],
              type: "text",
            },
          ]}
          form={form}
          isLoading={isLoading}
          submitLabel={translate["deleteMessageForm"]["submitLabel"]}
          submitLoadingLabel={
            translate["deleteMessageForm"]["submitLoadingLabel"]
          }
        />
      </DialogContent>
    </Dialog>
  );
}
