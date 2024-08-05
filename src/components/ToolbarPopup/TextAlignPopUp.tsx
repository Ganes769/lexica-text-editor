import {  useRef, useState, useEffect } from "react";
import { useHeadingContext } from "../../context/HeadingContext";
import TextAlignPlugin from "../../plugins/TextAlignPlugin";
import PopupMenu from "../PopupWrapper/PopupMenu";
import ClickAwayListener from "../ClickAwayListner/ClickAwayListners";

export function capitalizeFirstLetter(value: string) {
  if (!value) return value; // handle empty string case
  return value.charAt(0).toUpperCase() + value.slice(1);
}
export default function TextAlignPopUp() {
  const { alignIcon } = useHeadingContext();
  const [align, showAlign] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (buttonRef.current && align) {
      const buttonRect =
        buttonRef.current && buttonRef.current.getBoundingClientRect();
      setPopupPosition({
        left: buttonRect.left,
        top: buttonRect.bottom,
      });
    }
  }, [align, buttonRef]);

  return (
    <ClickAwayListener onClickAway={() => showAlign(false)}>
      <div className="insert-menu">
        <button
          type="button"
          ref={buttonRef}
          onClick={() => showAlign(!align)}
          className={`toolbar-item icon block-type align-list ${
            align && "active"
          }`}
        >
          <i className={`format  ${alignIcon}-align`} />
          <span className="toolbar-item text dropdown-text ">
            {capitalizeFirstLetter(alignIcon)}
          </span>
        </button>
      </div>
      {align && (
        <PopupMenu
          style={{
            zIndex: 100,
            position: "fixed",
            left: `${popupPosition.left}px`,
            top: `${popupPosition.top + 10}px`,
          }}
        >
          <TextAlignPlugin align={align} showAlign={showAlign} />
        </PopupMenu>
      )}
    </ClickAwayListener>
  );
}
