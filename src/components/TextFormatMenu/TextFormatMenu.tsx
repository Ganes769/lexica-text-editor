import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isTableSelection } from "@lexical/table";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  FORMAT_TEXT_COMMAND,
  LexicalNode,
  TextNode,
} from "lexical";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { $getNearestBlockElementAncestorOrThrow } from "@lexical/utils";
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text";
import { useCallback, useState } from "react";
interface Props {
  setIsOpen: (isOpen: boolean) => void;
}
export default function TextFormatMenu({ setIsOpen }: Props) {
  const [editor] = useLexicalComposerContext();
  const [isActive, setIsActive] = useState(false);
  const clearFormatting = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || $isTableSelection(selection)) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const nodes = selection.getNodes();
        const extractedNodes = selection.extract();

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return;
        }

        nodes.forEach(
          (node: LexicalNode | TextNode | null | undefined, idx: number) => {
            if ($isTextNode(node)) {
              let textNode = node;
              if (idx === 0 && anchor.offset !== 0) {
                textNode = textNode.splitText(anchor.offset)[1] || textNode;
              }
              if (idx === nodes.length - 1) {
                textNode = textNode.splitText(focus.offset)[0] || textNode;
              }

              const extractedTextNode = extractedNodes[0];
              if (nodes.length === 1 && $isTextNode(extractedTextNode)) {
                textNode = extractedTextNode;
              }

              if (textNode.__style !== "") {
                textNode.setStyle("");
              }
              if (textNode.__format !== 0) {
                textNode.setFormat(0);
                $getNearestBlockElementAncestorOrThrow(textNode).setFormat("");
              }
              node = textNode;
            } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
              node.replace($createParagraphNode(), true);
            } else if ($isDecoratorBlockNode(node)) {
              node.setFormat("");
            }
          }
        );
      }
    });
  }, [editor]);
  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
          setIsActive(true);
          setIsOpen(false);
        }}
        className={`toolbar-item icon block-type text-style ${
          isActive && "active dropdown-item-active"
        }`}
        aria-label="Right Align"
      >
        <i className="format subscript" />
        <span className="text toolbar-item spaced">Subscript</span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
          setIsActive(true);
          setIsOpen(false);
        }}
        className={`toolbar-item icon block-type text-style ${
          isActive && "active dropdown-item-active"
        }`}
        aria-label="Right Align"
      >
        <i className="format superscript" />
        <span className="text toolbar-item spaced">Subscript</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearFormatting();
          setIsOpen(false);
        }}
        className="toolbar-item icon block-type text-style"
        type="button"
        aria-label="Right Align"
      >
        <i className="format trash" />
        <span className="text toolbar-item spaced">Clear Formatting</span>
      </button>
    </>
  );
}
