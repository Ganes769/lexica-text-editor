import { useRef, useState } from "react";
import InsertMenu from "./InsertMenu";
export default function MobileInsaertMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
        className={` toolbar-item spaced ${isOpen && "active"} mobile-menuitems`}
        aria-label="format Strikethrough"
      >
        <span className={`text toolbar-item spaced ${isOpen && "active"}`}>
          Insert
        </span>
        <i className="format arrowDown " />
      </button>
      <div className={`menu ${isOpen ? "open" : "closed"}`}>
        <InsertMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
