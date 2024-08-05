import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { sanitizeUrl } from "../../utils/url";
import PopupMenu from "../PopupWrapper/PopupMenu";
import "../TextInput/Input.css";

export default function EmbedLink() {
  const [editor] = useLexicalComposerContext();
  const [urlInput, setUrlInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (buttonRef.current && showPopup) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPopupPosition({
        left: buttonRect.left,
        top: buttonRect.bottom,
      });
    }
  }, [showPopup, buttonRef]);

  const handleInputChange = (e: any) => {
    setUrlInput(e?.target?.value);
  };

  const insertLink = useCallback(() => {
    if (urlInput.trim() !== "") {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(urlInput));
      setShowPopup(false);
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, urlInput]);

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setShowPopup(!showPopup)}
        className="toolbar-item spaced"
        aria-label="Format Link"
      >
        <i className="format link" />
      </button>
      {showPopup && (
        <PopupMenu
          className={`popup-menu ${showPopup ? "show" : ""}`}
          style={{
            position: "fixed",
            top: `${popupPosition.top + 20}px`,
            left: `${popupPosition.left - 10}px`,
            zIndex: 200,
          }}
        >
          <div className="embed-link">
            <input
              className="Input__input"
              type="text"
              value={urlInput}
              onChange={handleInputChange}
              placeholder="Enter the URL"
            />
            <button
              type="button"
              onClick={insertLink}
              className="toolbar-item icon insert-btn"
            >
              <i className="format plus" />
            </button>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="toolbar-item icon btn insert-btn"
            >
              <i className="format close" />
            </button>
          </div>
        </PopupMenu>
      )}
    </>
  );
}
