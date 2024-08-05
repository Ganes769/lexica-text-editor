import React from "react";
import "./Chip.css";
import "../../styles.css";

interface ChipProps {
  name: string;
  onDelete?: () => void;
}

const ChipComponent: React.FC<ChipProps> = ({ name, onDelete }) => {
  return (
    <div className="chip">
      <span className="chip-text">{name}</span>
      <button type="button" className="remove-file" onClick={onDelete}></button>
    </div>
  );
};

export default ChipComponent;
