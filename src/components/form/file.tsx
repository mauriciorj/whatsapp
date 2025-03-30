import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  field: any;
  fieldToRender: any;
  isLoading: boolean;
  onBlur: () => void;
  onChange: (files: FileList | null) => void;
}

export default function FileUpload({
  field,
  fieldToRender,
  isLoading,
  onBlur,
  onChange,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      onChange(files);
    }
  };

  return (
    <div className="w-full">
      <Label htmlFor={field.name}>
        {fieldToRender.label}
      </Label>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={`${field.name}-input`}
          type="file"
          className="sr-only"
          accept={fieldToRender.accept || "*"}
          disabled={isLoading}
          onChange={handleFileChange}
          onBlur={onBlur}
        />
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => document.getElementById(`${field.name}-input`)?.click()}
        >
          <UploadCloud className="h-4 w-4 mr-2" />
          {fieldToRender.buttonText || "Select File"}
        </Button>
        {fileName && (
          <div className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
            {fileName}
          </div>
        )}
      </div>
    </div>
  );
} 