import { useEffect, useRef, useState } from "react";
import TextFormatPlugin from "../../plugins/TextFormatPlugin";
import PopupMenu from "../PopupWrapper/PopupMenu";
import ClickAwayListener from "../ClickAwayListner/ClickAwayListners";

export default function TextFormatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

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
      <div className="insert-menu">
        <button
          type="button"
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`toolbar-item spaced`}
          aria-label="format Strikethrough"
        >
          <i className="format dropDown-more" />
          <i className="format arrowDown " />
        </button>
      </div>
      {isOpen && (
        <PopupMenu
          style={{
            position: "fixed",
            zIndex: 100,
            top: `${popupPosition.top + 10}px`,
            left: `${popupPosition.left - 20}px`,
          }}
        >
          <TextFormatPlugin setIsOpen={setIsOpen} />
        </PopupMenu>
      )}
    </ClickAwayListener>
  );
}
