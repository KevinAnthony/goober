import styles from "./drawer/drawer.module.css";
import React from "react";

interface props {
  onColorChanged: (color: string) => void;
  selectedColor: string;
  colors: Array<string>;
}

export function ColorPicker({ onColorChanged, selectedColor, colors }: props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onColorChanged(event.target.value);
  }
  return (
    <div>
      <fieldset className={styles.color_picker}>
        <legend>Bin Color</legend>
        <div onChange={handleChange}>
          {colors.map((color: string, index: number) => (
            <input
              type="radio"
              value={color}
              id={`color-${index}`}
              key={`color-${color}`}
              checked={color === selectedColor}
              style={{ background: color }}
              onChange={() => {}}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
