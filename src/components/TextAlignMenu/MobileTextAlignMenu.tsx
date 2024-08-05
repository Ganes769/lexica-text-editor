import { useState } from "react";
import TextAlignMenu from "./TextAlignMenu";

export default function MobileTextAlignMenu() {
  const [align, showAlign] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => showAlign(!align)}
        className={`mobile-menuitems toolbar-item icon block-type align-list ${
          align && "active"
        }`}
      >
        <span className="toolbar-item text dropdown-text ">Align</span>
        <i className="format arrowDown" />
      </button>
      <div className={`menu ${align ? "open" : "closed"}`}>
        <TextAlignMenu align={align} showAlign={showAlign} />
      </div>
    </>
  );
}
