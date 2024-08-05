import "./styles.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import LexicalTextEditor from "./LexicalTextEditor";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <App />
    </div>
  </React.StrictMode>
);
function App() {
  const [selectedFile, setselectedFile] = useState<File[] | []>([]);
  const handleSelectedFile = (file: File[]) => {
    if (file.length > 0) {
      setselectedFile((prev) => [...prev, ...file]);
    }
  };
  const handleDelete = (fileName: string) => {
    setselectedFile((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  return (
    <LexicalTextEditor
      onFileDelete={handleDelete}
      defaultValue=""
      onChange={() => ({})}
      handleSelectedFile={handleSelectedFile}
      selectedFile={selectedFile}
    />
  );
}
