import { ReactNode, useRef } from "react";
import ClickAwayListener from "../ClickAwayListner/ClickAwayListners";

interface Props {
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export default function PopupMenu({ className, children, style }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={boxRef} className={`popup ${className}`} style={style}>
      <ClickAwayListener
        onClickAway={() => {
          /* Add your onClickAway logic here */
        }}
      >
        <div className="popuppicker">{children}</div>
      </ClickAwayListener>
    </div>
  );
}
