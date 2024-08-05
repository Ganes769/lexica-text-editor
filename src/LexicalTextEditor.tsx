import { useState } from "react";
import "./styles.css";
import { UserData } from "./components/Editor/Editor";
import Editor from "./components/Editor/EditorWrapper";
import React from "react";

export interface LexicalPropTypes {
  defaultValue: string;
  value?: string;
  selectedFile: any;
  onChange: (prev: string) => void;
  handleSelectedFile: any;
  label?: string;
  placeHolder?: string;
  onImageUpload?: (data: any) => Promise<{ url: string }>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  mentionOptionsResolver?: (query: string) => Promise<UserData[]>;
  onFileDelete: (fileName: string) => void;
}

export default function LexicalTextEditor({
  defaultValue,
  value,
  onChange,
  placeHolder,
  onImageUpload,
  mentionOptionsResolver,
  onKeyDown,
  selectedFile,
  handleSelectedFile,
  onFileDelete,
}: LexicalPropTypes) {
  const [htmlstring, setHtmlString] = useState<string>(defaultValue);
console.log(htmlstring);

  function handlleHtmlChange(html: string) {
    setHtmlString(html);
    onChange(html);
  }

  return (
    <div>
      <Editor
        handleFileDelete={onFileDelete}
        defaultValue={defaultValue}
        placeHolder={placeHolder}
        htmlstring={value ?? ""}
        mentionOptionsResolver={mentionOptionsResolver}
        selectedFile={selectedFile}
        setHtmlString={handlleHtmlChange}
        onImageUpload={onImageUpload}
        setSelectedFile={handleSelectedFile}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
