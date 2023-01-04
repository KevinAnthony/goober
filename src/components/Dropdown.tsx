import React from "react";
import { splitAndUppercase } from "../util/formatting";
import { Select } from "antd";
import styles from "./Dropdown.module.css";

interface props {
  options: Array<string>;
  selected: string;
  onSelected: (index: number) => void;
}

export function Dropdown({ options, selected, onSelected }: props) {
  selected = splitAndUppercase(selected);
  const [selectedState, setSelected] = React.useState(selected);

  function onMenuClick(value: string) {
    const index = parseInt(value);
    onSelected(index);
    setSelected(splitAndUppercase(options[index]));
  }

  let items = [];
  for (let i = 0; i < options.length; i++) {
    items?.push({
      label: <label>{splitAndUppercase(options[i])}</label>,
      value: i,
    });
  }

  return (
    <Select
      defaultValue={selected}
      onChange={onMenuClick}
      options={items}
      className={styles.menu}
      popupClassName={styles.menu_popup}
    >
      <button onClick={(e) => e.preventDefault()}>{selectedState}</button>
    </Select>
  );
}
