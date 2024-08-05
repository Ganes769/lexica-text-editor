import { $patchStyleText } from "@lexical/selection";
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { useCallback, useState, useEffect, useRef } from "react";

import PopupMenu from "../PopupWrapper/PopupMenu";
import ClickAwayListener from "../ClickAwayListner/ClickAwayListners";

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
];

export default function FontDropDown({
  editor,
  value,
  style,
}: {
  editor: LexicalEditor;
  value: string;
  style: string;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
      setCurrentValue(option);
      setIsOpen(false);
    },
    [editor, style]
  );

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (buttonRef.current && isOpen) {
      const buttonRect =
        buttonRef.current && buttonRef.current.getBoundingClientRect();
      setPopupPosition({
        left: buttonRect.left,
        top: buttonRect.bottom,
      });
    }
  }, [isOpen, buttonRef]);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`toolbar-item icon block-type align-list ${
          isOpen && "active"
        }`}
      >
        <i className="format fontFamily" />
        <span className={`toolbar-item text ${isOpen && "active"}`}>
          {currentValue}{" "}
        </span>
      </button>

      {isOpen && (
        <PopupMenu
          style={{
            zIndex: 100,
            position: "fixed",
            left: `${popupPosition.left}px`,
            top: `${popupPosition.top + 10}px`,
          }}
        >
          {FONT_FAMILY_OPTIONS.map(([option, text]) => (
            <button
              className="toolbar-item icon block-type"
              type="button"
              onClick={() => handleClick(option)}
              key={option}
            >
              <i className="format fontFamily" />
              <span className={`text ${isOpen && "active"}`}>{text}</span>
            </button>
          ))}
        </PopupMenu>
      )}
    </ClickAwayListener>
  );
}
