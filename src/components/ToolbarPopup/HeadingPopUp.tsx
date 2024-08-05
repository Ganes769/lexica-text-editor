import { capitalizeFirstLetter } from "./TextAlignPopUp";
import { useHeadingContext } from "../../context/HeadingContext";
import { usePopupPosition } from "../../hooks/usePopUpPosition";
import HeadingPlugin from "../../plugins/HeadingPlugin";
import PopupMenu from "../PopupWrapper/PopupMenu";
import ClickAwayListener from "../ClickAwayListner/ClickAwayListners";
export default function HeadingPopUp() {
  const { heading } = useHeadingContext();
  const { buttonRef, popupPosition, showPopup, setShowPopup } =
    usePopupPosition();
  return (
    <ClickAwayListener onClickAway={() => setShowPopup(false)}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setShowPopup(!showPopup)}
        className={`toolbar-item icon block-type ${showPopup && "active"}`}
      >
        <i className={`format ${heading}`} />
        <span className={`toolbar-item text ${showPopup && "active"}`}>
          {capitalizeFirstLetter(heading)}
        </span>
      </button>
      {showPopup && (
        <PopupMenu
          style={{
            zIndex: 100,
            position: "fixed",
            left: `${popupPosition.left}px`,
            top: `${popupPosition.top + 10}px`,
          }}
        >
          <HeadingPlugin headings={showPopup} showHeading={setShowPopup} />
        </PopupMenu>
      )}
    </ClickAwayListener>
  );
}
