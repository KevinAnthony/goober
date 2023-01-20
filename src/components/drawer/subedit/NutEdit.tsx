import { nutTypes, finishes, SubEditProps } from "../SubEditProps";
import { Dropdown } from "../../Dropdown";
import React, { ChangeEvent } from "react";
import "./subEditStyle.css";
import { TextBox } from "../../TextBox";

export function NutEdit({ content, updateCallback }: SubEditProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "inherit",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <TextBox
          id="size"
          label="Size"
          defaultValue={content.nut?.threadSize ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            content.nut.threadSize = target.value;
            updateCallback();
          }}
          style={{ width: "110px" }}
        />
        <TextBox
          id="pitch"
          label="Pitch"
          defaultValue={content.nut?.threadPitch ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            content.nut.threadPitch = target.value;
            updateCallback();
          }}
          style={{ width: "110px" }}
        />
      </div>
      <Dropdown
        options={nutTypes}
        selected={content.nut.type}
        onSelected={(i) => {
          content.nut.type = nutTypes[i];
          updateCallback();
        }}
      />
      <Dropdown
        options={finishes}
        selected={content.nut?.material ?? ""}
        onSelected={(i) => {
          content.nut.material = finishes[i];
          updateCallback();
        }}
      />
      <TextBox
        id="size"
        label="Description"
        defaultValue={content.nut?.description ?? ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;
          content.nut.description = target.value;
          updateCallback();
        }}
        style={{ width: "300px" }}
      />
    </div>
  );
}
