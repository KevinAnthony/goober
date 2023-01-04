import styles from "./TextBox.module.css";
import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface props {
  defaultValue: string | number | ReadonlyArray<string> | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
  style?: React.CSSProperties;
}

export function TextBox({
  defaultValue,
  onChange,
  id,
  label,
  style,
  type = "text",
}: props) {
  return (
    <div className={styles.ns_textbox}>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        className={styles.ns_textbox_input}
        placeholder="a"
        style={style}
      />
      <label htmlFor={id} className={styles.ns_textbox_label}>
        {label}
      </label>
    </div>
  );
}
