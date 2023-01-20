import { finishes, SubEditProps } from "../SubEditProps";
import { Dropdown } from "../../Dropdown";
import React, { ChangeEvent } from "react";
import "./subEditStyle.css";
import { parseNumber } from "../../../util/utils";
import { TextBox } from "../../TextBox";

export function NailEdit({ content, updateCallback }: SubEditProps) {
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
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
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
            id="gauge"
            label="Gauge"
            defaultValue={content.nail?.gauge ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              content.nail.gauge = target.value;
              updateCallback();
            }}
            style={{ width: "110px" }}
          />
          <TextBox
            id="length"
            label="Length"
            defaultValue={content.nail?.length ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              content.nail.length = parseNumber(target.value);
              updateCallback();
            }}
            style={{ width: "110px" }}
          />
        </div>
        <Dropdown
          options={finishes}
          selected={content.nail?.material ?? ""}
          onSelected={(i) => {
            content.nail.material = finishes[i];
            updateCallback();
          }}
        />
        <TextBox
          id="size"
          label="Description"
          defaultValue={content.nail?.description ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            content.nail.description = target.value;
            updateCallback();
          }}
          style={{
            width: "300px",
          }}
        />
      </div>
    </div>
  );
}
