import useModal from "../../hooks/useModal";
import { useHeadingContext } from "../../context/HeadingContext";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { INSERT_PAGE_BREAK } from "../../plugins/PageBreak";
import { LexicalCommand } from "lexical";
import { InsertTableDialog } from "../../plugins/TablePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
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

  const handleCloseMenu = () => {
    setIsOpen(false);
  };
  
  
  return (
    <>
      {modal}
      {insertOption.map((option: InsertType, index) => (
        <button
          type="button"
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            editor.dispatchCommand(option.command, undefined);
            handleCloseMenu();
          }}
          className="toolbar-item toolbar-btn"
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
                handleCloseMenu();
              }}
            />
          ));
        }}
        className="toolbar-item toolbar-btn"
        aria-label="Insert Table"
      >
        <i className="format table" />
        <span className="text toolbar-item spaced">Table</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setIsImageUpload(true);
          handleCloseMenu();
        }}
        className="toolbar-item toolbar-btn"
        aria-label={`format `}
      >
        <i className="format file-image" />
        <span className="text toolbar-item ">Image</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setIsFileOpen(true);
          handleCloseMenu();
        }}
        className="toolbar-item spaced toolbar-btn"
        aria-label={`format `}
      >
        <i className="format file" />
        <span className="text toolbar-item spaced">Document</span>
      </button>
    </>
  );
}
