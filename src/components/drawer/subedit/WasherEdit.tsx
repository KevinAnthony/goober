import { Dropdown } from "../../Dropdown";
import React, { ChangeEvent } from "react";
import { finishes, SubEditProps, washerTypes } from "../SubEditProps";
import { TextBox } from "../../TextBox";

export function WasherEdit({ content, updateCallback }: SubEditProps) {
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
          gap: "10px",
        }}
      >
        <TextBox
          id="size"
          label="Size"
          defaultValue={content.washer?.size ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            content.washer.size = target.value;
            updateCallback();
          }}
          style={{ width: "330" }}
        />
      </div>
      <Dropdown
        options={finishes}
        selected={content.washer.material}
        onSelected={(i) => {
          content.washer.material = finishes[i];
          updateCallback();
        }}
      />
      <Dropdown
        options={washerTypes}
        selected={content.washer.type}
        onSelected={(i) => {
          content.washer.type = washerTypes[i];
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
