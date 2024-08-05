import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, HeadingTagType, $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";

import { useHeadingContext } from "../context/HeadingContext";
interface HeadingProps {
  headings: boolean;
  showHeading: (headings: boolean) => void;
}
export default function HeadingPlugin({ showHeading }: HeadingProps) {
  const [editor] = useLexicalComposerContext();
  const { setHeading } = useHeadingContext();
  function headingFormat(headingSize: HeadingTagType, heading: string) {
    editor.update(() => {
      setHeading(heading);
      const selection = $getSelection();
      $setBlocksType(selection, () => $createHeadingNode(headingSize));
    });
  }
  const formatParagraph = () => {
    setHeading("normal");
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };
  return (
    <>
      <button
        type="button"
        onClick={() => {
          formatParagraph();
          showHeading(false);
        }}
        className="toolbar-item spaced"
      >
        <i className="format normal" />
        <span className="text toolbar-item spaced">Normal</span>
      </button>
      <button
        type="button"
        onClick={() => {
          headingFormat("h1", "heading1");
          showHeading(false);
        }}
        className="toolbar-item spaced"
      >
        <i className="format heading1" />
        <span className="text toolbar-item spaced dropdown-button-text ">Heading 1</span>
      </button>
      <button
        type="button"
        onClick={() => {
          headingFormat("h2", "heading2");
          showHeading(false);
        }}
        className="toolbar-item spaced"
      >
        {" "}
        <i className="format heading2" />
        <span className="text toolbar-item spaced">Heading 2</span>
      </button>
      <button
        type="button"
        onClick={() => {
          headingFormat("h3", "heading3");
          showHeading(false);
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <i className="format heading3" />
        <span className="text toolbar-item spaced">Heading 3</span>
      </button>
      <button
        type="button"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            $setBlocksType(selection, () => $createQuoteNode());
          });
          showHeading(false);
          setHeading("quote");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <i className="format quote" />
        <span className="text toolbar-item spaced">Quote</span>
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          showHeading(false);
          setHeading("bullet");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <i className="format bullet" />
        <span className="text toolbar-item spaced">Bullet</span>
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          showHeading(false);
          setHeading("numberdlist");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <i className="format bullet" />
        <span className="text toolbar-item spaced">Numbered List</span>
      </button>
    </>
  );
}
