import { useState } from "react";
import TextFormatMenu from "./TextFormatMenu";

export default function MobileTextFormatPlugin() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
        className={`mobile-menuitems toolbar-item spaced ${isOpen && "active"}`}
      >
        {" "}
        <span className={`toolbar-item spaced ${isOpen && "active"} text`}>
          Format
        </span>
        <i className="format arrowDown " />
      </button>
      <div className={`menu ${isOpen ? "open" : "closed"}`}>
        <TextFormatMenu setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
