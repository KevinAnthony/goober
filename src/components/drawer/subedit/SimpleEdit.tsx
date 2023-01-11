import { SubEditProps } from "../SubEditProps";
import React, { ChangeEvent } from "react";
import { TextBox } from "../../TextBox";

export function SimpleEdit({ bin, index, updateCallback }: SubEditProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: "1em",
          display: "flex",
          gap: "10px",
        }}
      >
        <TextBox
          id="size"
          label="Description"
          defaultValue={bin.content[index].simple?.description ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            bin.content[index].simple.description = target.value;
            updateCallback(bin);
          }}
          style={{ width: "300px" }}
        />
      </div>
    </div>
  );
}
