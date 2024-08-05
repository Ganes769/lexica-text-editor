import { $generateNodesFromDOM } from "@lexical/html";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { $getRoot } from "lexical";
import { useEffect, useState } from "react";
import { useHeadingContext } from "../../context/HeadingContext";
import { useSettings } from "../../context/SettingsContext";
import ImagesPlugin, { InsertImageDialog } from "../../plugins/ImagePlugin";
import PageBreakPlugin from "../../plugins/PageBreak";
import ToolbarPlugin from "../../plugins/ToolbarPlugin";
import FileUpload from "../FileUpload/FileUpload";
import MentionPlugin from "../Mentions";
import Modal from "../Modal/Modal";
import Placeholder from "../Placeholder/PlaceHolder";
import TableActionMenuPlugin from "../TableActionMenuPlugin";
import TableCellResizerPlugin from "../TableCellResizer";
import UploadedFile from "../ToolbarPopup/UploadedFile";
interface EditorProps {
  defaultValue: string;
  selectedFile: File[];
  mentionOptionsResolver?: (data: string) => Promise<UserData[]>;
  setSelectedFile: (selectedFile: File[]) => void;
  placeHolder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;

  handleFileDelete: (fileName: string) => void;
}
export interface UserData {
  name: string;
  url: string;
}
export default function EditorComponent({
  defaultValue,
  placeHolder,
  mentionOptionsResolver,
  selectedFile,
  handleFileDelete,
  setSelectedFile,
  onKeyDown,
}: EditorProps) {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<
    HTMLDivElement | undefined
  >(undefined);

  const {
    settings: { tableCellMerge, tableCellBackgroundColor },
  } = useSettings();
  const [editor] = useLexicalComposerContext();
  const [, setEditorState] = useState<string>(defaultValue);

  const { isImageUpload, setIsImageUpload, isFileOpen, setIsFileOpen } =
    useHeadingContext();

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  function getDefaultvalue() {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(defaultValue, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear().append(...nodes);
    });
  }
  useEffect(() => {
    getDefaultvalue();
  }, [editor, defaultValue]);

  const onChange = (state: any) => {
    const editorStateJSON = state?.toJSON();
    setEditorState(editorStateJSON);
  };

  return (
    <div className="editor-container">
      <ToolbarPlugin />
      <div className="editor-inner">
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable
                  onKeyDown={onKeyDown}
                  className="editor-input"
                />
              </div>
            </div>
          }
          placeholder={
            <Placeholder className="editor-placeholder">
              {placeHolder || "Enter some text..."}
            </Placeholder>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {mentionOptionsResolver && (
          <MentionPlugin optionResolver={mentionOptionsResolver} />
        )}
        <ImagesPlugin />
        <OnChangePlugin onChange={onChange} />
        <TableCellResizerPlugin />
        <TablePlugin
          hasCellMerge={tableCellMerge}
          hasCellBackgroundColor={tableCellBackgroundColor}
        />
        {floatingAnchorElem && (
          <TableActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge />
        )}
        {isImageUpload && (
          <Modal title="Upload Image" onClose={() => setIsImageUpload(false)}>
            <InsertImageDialog activeEditor={editor} />
          </Modal>
        )}
        {isFileOpen && (
          <Modal title="Upload File" onClose={() => setIsFileOpen(false)}>
            <FileUpload confirm={selectedFile} setConfirm={setSelectedFile} />
          </Modal>
        )}
        <LinkPlugin />
        <HorizontalRulePlugin />
        <ListPlugin />
        <PageBreakPlugin />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <UploadedFile handleDelete={handleFileDelete} file={selectedFile} />
      </div>
    </div>
  );
}
