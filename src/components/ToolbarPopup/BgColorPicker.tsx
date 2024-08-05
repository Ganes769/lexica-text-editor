import { useState } from "react";

import useColorPicker from "../../hooks/useColorPicker";
import { usePopupPosition } from "../../hooks/usePopUpPosition";
import ColorPicker from "../ColorPicker/ColorPicker";
import ClickAwayListener from "../ClickAwayListner/ClickAwayListners";

export default function BgColorPicker() {
  const { buttonRef, showPopup, setShowPopup, popupPosition } =
    usePopupPosition();
  const { onBgColorSelect } = useColorPicker();
  const [color, setColor] = useState<string>("#ffffff");
  function handleColorChanage(color: string) {
    onBgColorSelect(color);
    setColor(color);
  }

  return (
    <ClickAwayListener onClickAway={() => setShowPopup(false)}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setShowPopup(!showPopup)}
        className={`toolbar-item spaced ${showPopup && "active"}`}
        aria-label="Left Align"
      >
        <i className="format bg-color" />
        <i className="format arrowDown" />
      </button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            zIndex: 100,
            top: `${popupPosition.top + 10}px`,
            left: `${popupPosition.left + 200}px`,
          }}
        >
          <ColorPicker
            className=""
            color={color}
            onChange={(color: any) => handleColorChanage(color)}
          />
        </div>
      )}
    </ClickAwayListener>
  );
}
