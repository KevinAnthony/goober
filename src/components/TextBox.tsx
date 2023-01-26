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
  style,
  label,
  type = "text",
}: props) {
  return (
    <fieldset className={styles.ns_textbox_border}>
      <legend>{label}</legend>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        className={styles.ns_textbox_input}
        style={style}
      />
    </fieldset>
  );
}
