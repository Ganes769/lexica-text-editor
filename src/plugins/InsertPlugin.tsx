import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { LexicalCommand } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useHeadingContext } from "../context/HeadingContext";
import useModal from "../hooks/useModal";
import { INSERT_PAGE_BREAK } from "./PageBreak";
import { InsertTableDialog } from "./TablePlugin";
import PopupMenu from "../components/PopupWrapper/PopupMenu";
interface InsertType {
  command: LexicalCommand<void>;
  name: string;
  icon: string;
}
interface Props {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const insertOption: InsertType[] = [
  {
    name: "Horizontal Rule",
    command: INSERT_HORIZONTAL_RULE_COMMAND,
    icon: "horizontal-rule",
  },
  {
    name: "Page Break",
    command: INSERT_PAGE_BREAK,
    icon: "page-break",
  },
];
export default function InsertMenu({ setIsOpen }: Props) {
  const { setIsImageUpload, setIsFileOpen } = useHeadingContext();
  const [modal, showModal] = useModal();
  const [editor] = useLexicalComposerContext();

  return (
    <PopupMenu>
      {modal}
      {insertOption.map((option: InsertType, index) => (
        <button
          type="button"
          key={index}
          onClick={() => {
            editor.dispatchCommand(option.command, undefined);
            setIsOpen(false);
          }}
          className="toolbar-item spaced"
          aria-label={`format ${option.name}`}
        >
          <i className={`format ${option.icon}`} />
          <span className="text toolbar-item spaced">{option.name}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => {
          showModal("Insert Table", (onClose) => (
            <InsertTableDialog
              activeEditor={editor}
              onClose={() => {
                onClose();
                setIsOpen(false);
              }}
            />
          ));
        }}
        className="toolbar-item spaced"
        aria-label="Insert Table"
      >
        <i className="format table" />
        <span className="text toolbar-item spaced">Table</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setIsImageUpload(true);
          setIsOpen(false);
        }}
        className="toolbar-item spaced"
        aria-label={`format `}
      >
        <i className="format file-image" />
        <span className="text toolbar-item spaced">Image</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setIsFileOpen(true);
        }}
        className="toolbar-item spaced"
        aria-label={`format `}
      >
        <i className="format file" />
        <span className="text toolbar-item spaced">Document</span>
      </button>
    </PopupMenu>
  );
}
