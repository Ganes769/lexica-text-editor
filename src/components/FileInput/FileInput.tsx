import "../TextInput/Input.css";

import * as React from "react";

import UploadImage, { UploadedFile } from "../ImageUpload/imageUpload";

type Props = Readonly<{
  "data-test-id"?: string;
  accept?: string;
  label: string;
  onChange: (files: UploadedFile[]) => void;
}>;

export default function FileInput({ onChange }: Props): JSX.Element {
  const [selectedFiles, setSelectedFiles] = React.useState<UploadedFile[]>([]);
  return (
    <div className="Input__wrapper">
      <UploadImage
        value={selectedFiles}
        name="image"
        onChange={(data) => {
          setSelectedFiles(data);
          onChange(data);
        }}
        onDrop={(data) => {
          setSelectedFiles(data);
          onChange(data);
        }}
        onRemove={(index) => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
      />
    </div>
  );
}
