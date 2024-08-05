import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { MarkNode } from "@lexical/mark";
import { OverflowNode } from "@lexical/overflow";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { TextNode } from "lexical";

import EditorComponent, { UserData } from "./Editor";
import { ExtendedTextNode } from "./ExtendedNode";
import { HeadingProvider } from "../../context/HeadingContext";
import { TableContext } from "../../plugins/TablePlugin";
import EditorTheme from "../../theme/PlaygroundEditorTheme";
import GetInput from "../GetInput/GetInput";
import { ImageNode } from "../ImageNode/ImageNode";
import { MentionNode } from "../MentionNode/MentionNode";
import { PageBreakNode } from "../PageBreakNode";

export const editorConfig = {
  // editorState: defaultValue,
  namespace: "React.js",
  nodes: [
    ExtendedTextNode,
    {
      replace: TextNode,
      with: (node: TextNode) => new ExtendedTextNode(node.__text),
    },
    TextNode,
    HeadingNode,
    ListNode,
    ListItemNode,
    MentionNode,
    QuoteNode,
    CodeNode,
    ImageNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    HashtagNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
    OverflowNode,
    HorizontalRuleNode,
    MarkNode,
    PageBreakNode,
  ],
  onError(error: Error) {
    throw error;
  },
  theme: EditorTheme,
};
interface EditorProps {
  selectedFile: File[];
  setSelectedFile: (selectedFile: File[]) => void;
  htmlstring: string;
  setHtmlString: (htmlstring: string) => void;
  defaultValue: string;
  placeHolder?: string;
  onImageUpload?: (data: File[]) => Promise<{ url: string }>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  mentionOptionsResolver?: (query: string) => Promise<UserData[]>;
  handleFileDelete: (fileName: string) => void;
}

export default function Editor({
  selectedFile,
  setSelectedFile,
  defaultValue,
  setHtmlString,
  onImageUpload,
  handleFileDelete,
  onKeyDown,
  placeHolder,
  mentionOptionsResolver,
}: EditorProps) {
  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <TableContext>
          <HeadingProvider onImageUpload={onImageUpload}>
            <EditorComponent
              handleFileDelete={handleFileDelete}
              mentionOptionsResolver={mentionOptionsResolver}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              defaultValue={defaultValue}
              placeHolder={placeHolder}
              onKeyDown={onKeyDown}
            />
            <GetInput onChange={setHtmlString} />
          </HeadingProvider>
        </TableContext>
      </LexicalComposer>
    </>
  );
}
