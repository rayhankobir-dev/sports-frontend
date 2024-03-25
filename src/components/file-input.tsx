/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalize, cn } from "@/lib/utils";
import { Icon } from "@/types";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileInputProps {
  className?: string;
  fieldName: string;
  maxSize: number;
  setOnChange: (file: File) => void;
  setError: (error: string | null) => void;
  supportedExtensions: string[];
  Icon: Icon;
}

export function FileInput({
  className,
  fieldName,
  maxSize,
  setOnChange,
  setError,
  supportedExtensions,
  Icon,
}: FileInputProps) {
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (
          validateFile(fieldName, file, maxSize, supportedExtensions, setError)
        ) {
          setOnChange(file);
          setSelectedFileName(file.name);
        }
      }
    },
    [fieldName, maxSize, setError, setOnChange, supportedExtensions]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className={cn(
        "flex gap-3 items-center border border-dashed rounded-xl py-3 px-4",
        className
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon />
      {selectedFileName ? (
        selectedFileName
      ) : (
        <p className="font-light text-sm">
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </div>
  );
}

function validateFile(
  fieldName: string,
  file: File,
  maxSize: number,
  supportedExtensions: string[],
  setError: (error: string | null) => void
): boolean {
  const allowedFormats = supportedExtensions.map((ext) => ext.toLowerCase());
  if (file.size > maxSize) {
    setError(`${capitalize(fieldName)} exceeds maximum file size (5MB)`);
    return false;
  }

  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  if (!fileExtension || !allowedFormats.includes(fileExtension)) {
    setError(
      `${capitalize(
        fieldName
      )} format is not supported (${supportedExtensions.join(", ")})`
    );
    return false;
  }

  setError(null);
  return true;
}
