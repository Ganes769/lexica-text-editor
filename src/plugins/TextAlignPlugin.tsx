import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";
import  { useState } from "react";
import { capitalizeFirstLetter } from "../components/ToolbarPopup/TextAlignPopUp";
import { useHeadingContext } from "../context/HeadingContext";
interface FormatType {
  [key: string]: ElementFormatType;
}
const textFormatType: FormatType = {
  Left: "left",
  Right: "right",
  Center: "center",
  Justify: "justify",
};
interface TextAlignProps {
  align?: boolean;
  showAlign?: (align: boolean) => void;
}
export default function TextAlignPlugin({ showAlign }: TextAlignProps) {
  const [currentAlignment, setCurrentAlignMent] = useState<string>("left");
  const [editor] = useLexicalComposerContext();
  const { setAlignIcon } = useHeadingContext();

  const alignText = (alignment: ElementFormatType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
      }
    });
  };
console.log(currentAlignment);

  return (
    <>
      {Object.entries(textFormatType).map(([key, value]) => {
        return (
          <button
            type="button"
            key={key}
            onClick={() => {
              setAlignIcon(value);
              setCurrentAlignMent(value);
              alignText(value);
              if (showAlign) {
                showAlign(false);
              }
            }}
            className="toolbar-item icon block-type text-style"
            aria-label={`${capitalizeFirstLetter(value)} Align`}
          >
            <i className={`format ${value}-align`} />
            <span className="text toolbar-item spaced">
              {capitalizeFirstLetter(value)}
            </span>
          </button>
        );
      })}
    </>
  );
}
