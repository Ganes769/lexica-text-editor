import { useState, useEffect, useRef, useCallback } from "react";

export function usePopupPosition() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updatePopupPosition = useCallback(() => {
    if (buttonRef.current && showPopup) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPopupPosition({
        left: buttonRect.left,
        top: buttonRect.bottom,
      });
    }
  }, [showPopup]);

  useEffect(() => {
    updatePopupPosition();
  }, [showPopup]);

  return {
    buttonRef,
    showPopup,
    setShowPopup,
    popupPosition,
    updatePopupPosition,
  };
}
