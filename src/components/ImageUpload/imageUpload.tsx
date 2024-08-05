import React, { ChangeEvent, DragEvent } from "react";
import "./imageUpload.css";

export interface UploadedFile {
  id?: string;
  url?: string;
  file: File;
}

interface Props {
  allowMultiple?: boolean;
  name: string;
  label?: string;
  onChange?: (file: UploadedFile[]) => void;
  onDrop?: (file: UploadedFile[]) => void;
  onRemove?: (index: number) => void;
  value?: UploadedFile[];
}

export const UploadImage: React.FC<Props> = ({
  allowMultiple = false,
  name,
  label,
  onChange,
  onDrop,
  onRemove,
  value: selectedFiles = [],
}) => {
  const mapFilesToObject = (files: FileList | null, callBack?: (file: UploadedFile[]) => void) => {
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      callBack && callBack(allowMultiple ? [...selectedFiles, ...newFiles] : [...newFiles]);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    mapFilesToObject(files, onChange);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    mapFilesToObject(files, onDrop);
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLElement>, index: number) => {
    event.stopPropagation();
    onRemove && onRemove(index);
  };

  return (
    <div className="image-upload-container ">
      <p className="label">{label}</p>
      <div className="upload-wrapper">
        <div
          className="upload__container"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleClick}
        >
          {selectedFiles.length > 0 ? (
            selectedFiles.map((uploadedFile, index) => (
              <div
                key={index}
                className="file-preview"
                style={{
                  flexBasis: selectedFiles?.length <= 1 ? "calc(100% - 8px)" : "calc(50% - 8px)",
                }}
              >
                <div>
                  <button className="remove-button" onClick={(e) => handleRemove(e, index)}>
                    X
                  </button>
                  <img src={uploadedFile?.url} alt="Selected" className="file-preview__image" />
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="placeholder-icon">Select</div>
              <p className="placeholder-text">
                {allowMultiple
                  ? "Drag & drop your image(s) here or click to select"
                  : "Drag & drop your image or click to select an image "}
              </p>
            </>
          )}
        </div>
        <input
          type="file"
          id="fileInput"
          name={name}
          className="file-input"
          onChange={handleFileChange}
          multiple={allowMultiple}
        />
      </div>
    </div>
  );
};

export default UploadImage;
