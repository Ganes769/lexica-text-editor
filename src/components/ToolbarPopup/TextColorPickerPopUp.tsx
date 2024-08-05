import { useState } from "react";
import useColorPicker from "../../hooks/useColorPicker";
import { usePopupPosition } from "../../hooks/usePopUpPosition";
import ColorPicker from "../ColorPicker/ColorPicker";
import ClickAwayListener from "../ClickAwayListner/ClickAwayListners";
export default function BgColorPicker() {
  const { buttonRef, showPopup, setShowPopup, popupPosition } =
    usePopupPosition();
  const { onFontColorSelect } = useColorPicker();
  const [color, setColor] = useState<string>("#000000");
  function handleColorChanage(color: string) {
    onFontColorSelect(color);
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
        <i className="format font-color" />
        <i className="format arrowDown" />
      </button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            zIndex: 100,
            top: `${popupPosition.top + 10}px`,
            left: `${popupPosition.left + 150}px`,
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
