import React, { useState } from "react";

import "./FileUpload.css";
import fileIcon from "../../../public/icons/sticky.svg";
import { useHeadingContext } from "../../context/HeadingContext";
import Button from "../Button/Button";
interface FileUploadProps {
  confirm: File[] | null;
  setConfirm: (confirm: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setConfirm,
}: FileUploadProps) => {
  const [file, setFile] = useState<File[] | []>([]);
  const { setIsFileOpen } = useHeadingContext();
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const onFileUpload = (file: File[]) => {
    setFile(file);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files); // Convert FileList to array
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    onFileUpload([...files, ...droppedFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    if (uploadedFiles.length > 0) {
      onFileUpload([...files, ...uploadedFiles]);
    }
  };

  const handleConfirm = (files: File[]) => {
    setConfirm(files);
  };
  const disabled = files.length === 0;
console.log(file);

  return (
    <div>
      <div
        style={{ marginBottom: "8px" }}
        className={`file-upload ${dragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="drop-area">
          <span className="drop-area__prompt">
            Drop files here or click to upload
          </span>
          <input
            type="file"
            multiple
            className="drop-area__input"
            onChange={handleFileChange}
          />
        </div>
        {files.length > 0 && (
          <div className="file-previews">
            {files.map((file, index) => (
              <div key={index} className="file-preview">
                <div className="file-preview__thumbnail">
                  <img className="file-preview__image" src={fileIcon} alt="" />
                </div>
                <div className="file-preview__info">
                  <span className="file-preview__name">{file.name}</span>
                  <span className="file-preview__name">{file.size}kb</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        disabled={disabled}
        onClick={() => {
          handleConfirm(files);
          setIsFileOpen(false);
        }}
        className=""
      >
        Confirm
      </Button>
    </div>
  );
};

export default FileUpload;
