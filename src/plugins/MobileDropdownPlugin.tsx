import { useEffect, useRef, useState } from "react";
import ClickAwayListener from "../components/ClickAwayListner/ClickAwayListners";
import MobileInsertMenu from "../components/InsertMenu/MobileinsertMenu";
import MobileTextAlignMenu from "../components/TextAlignMenu/MobileTextAlignMenu";
import MobileTextFormatPlugin from "../components/TextFormatMenu/MobileTextFormatPlugin";
export default function MobileDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    if (buttonRef.current && isOpen) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPopupPosition({
        left: buttonRect.left,
        top: buttonRect.bottom,
      });
    }
  }, [isOpen, buttonRef]);

  return (
    <div className="mobile-menu">
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <button
          ref={buttonRef}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="dot-menu toolbar-item spaced"
          type="button"
        >
          <i className="format three-dot" />
        </button>
        {isOpen && (
          <div
            className="mobile-popup"
            style={{
              top: `${popupPosition.top + 18}px`,
              left: `${popupPosition.left - 120}px`,
              position: "fixed",
            }}
          >
            <MobileInsertMenu />
            <MobileTextAlignMenu />
            <MobileTextFormatPlugin />
          </div>
        )}
      </ClickAwayListener>
    </div>
  );
}
