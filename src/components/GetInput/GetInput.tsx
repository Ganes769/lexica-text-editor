import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalEditor } from "lexical";
import { useState } from "react";

interface InputProps {
  onChange: (html: string) => void;
}
export default function GetInput({ onChange }: InputProps) {
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState("");
console.log(htmlString);

  const handleEditorChange = (editor: LexicalEditor) => {
    editor.update(() => {
      const isEditorEmpty =
        editor._rootElement?.children.length === 1 &&
        editor._rootElement?.children?.[0]?.children?.[0]?.tagName === "BR";

      const htmlString = isEditorEmpty ? "" : $generateHtmlFromNodes(editor);
      onChange(htmlString);
      setHtmlString(htmlString);
    });
  };

  return <OnChangePlugin onChange={() => handleEditorChange(editor)} />;
}
