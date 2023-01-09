import React, { ChangeEvent } from "react";
import { splitAndUppercase } from "../util/formatting";
import styles from "./Dropdown.module.css";
// import "./Dropdown.css";

interface props {
  options: Array<string>;
  selected: string;
  onSelected: (index: number) => void;
  style?: React.CSSProperties;
}

export function Dropdown({ options, selected, onSelected, style }: props) {
  selected = splitAndUppercase(selected);

  let new_options: Array<string> = [];
  for (let i = 0; i < options.length; i++) {
    new_options.push(splitAndUppercase(options[i]));
  }

  function onMenuClick(e: ChangeEvent<HTMLSelectElement>) {
    onSelected(new_options.indexOf(e.target.value));
  }
  return (
    <select
      style={style}
      defaultValue={selected}
      onChange={onMenuClick}
      className={styles.dropdown}
    >
      <option value={""} hidden={true} selected={true}>
        ---
      </option>
      {new_options.map((option: string) => (
        <option
          className={styles.dropdown_items}
          selected={selected === option}
        >
          {option}
        </option>
      ))}
    </select>
  );
}
