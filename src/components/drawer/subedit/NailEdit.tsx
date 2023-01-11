import { finishes, SubEditProps } from "../SubEditProps";
import { Dropdown } from "../../Dropdown";
import React, { ChangeEvent } from "react";
import "./subEditStyle.css";
import { parseNumber } from "../../../util/utils";
import { TextBox } from "../../TextBox";

export function NailEdit({ bin, index, updateCallback }: SubEditProps) {
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
            defaultValue={bin.content[index].nail?.gauge ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              bin.content[index].nail.gauge = target.value;
              updateCallback(bin);
            }}
            style={{ width: "110px" }}
          />
          <TextBox
            id="length"
            label="Length"
            defaultValue={bin.content[index].nail?.length ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              bin.content[index].nail.length = parseNumber(target.value);
              updateCallback(bin);
            }}
            style={{ width: "110px" }}
          />
        </div>
        <Dropdown
          options={finishes}
          selected={bin.content[index].nail?.material ?? ""}
          onSelected={(i) => {
            bin.content[index].nail.material = finishes[i];
            updateCallback(bin);
          }}
        />
        <TextBox
          id="size"
          label="Description"
          defaultValue={bin.content[index].nail?.description ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            bin.content[index].nail.description = target.value;
            updateCallback(bin);
          }}
          style={{
            width: "300px",
          }}
        />
      </div>
    </div>
  );
}
