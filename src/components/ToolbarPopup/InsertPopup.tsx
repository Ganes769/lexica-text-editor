import { useEffect, useRef, useState } from "react";
import InserttPlugin from "../../plugins/InsertPlugin";
import ClickAwayListener from "../ClickAwayListner/ClickAwayListners";
export default function InsertPopup() {
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
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={`toolbar-item spaced ${isOpen && "active"}`}
          aria-label="format Strikethrough"
        >
          <i className="format plus" />
          <span className={`text toolbar-item spaced ${isOpen && "active"}`}>
            Insert
          </span>
          <i className="format arrowDown " />
        </button>
      </div>
      {isOpen && (
        <div
          style={{
            zIndex: 200,
            position: "fixed",
            top: `${popupPosition.top + 10}px`,
            left: `${popupPosition.left - 50}px`,
          }}
        >
          <InserttPlugin isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </ClickAwayListener>
  );
}
