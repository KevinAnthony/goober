import {
  finishes,
  screwDrive,
  screwHeads,
  screwTypes,
  SubEditProps,
} from "../SubEditProps";
import { Dropdown } from "../../Dropdown";
import React, { ChangeEvent } from "react";
import { parseNumber } from "../../../util/utils";
import { TextBox } from "../../TextBox";

export function ScrewEdit({ bin, index, updateCallback }: SubEditProps) {
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
          label="Size"
          defaultValue={bin.content[index].screw?.size ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            bin.content[index].screw.size = target.value;
            updateCallback(bin);
          }}
        />
        <TextBox
          id="length"
          label="Length"
          defaultValue={bin.content[index].screw?.length ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log("onchange");

            const target = e.target as HTMLInputElement;
            bin.content[index].screw.length = parseNumber(target.value);
            updateCallback(bin);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Dropdown
          options={finishes}
          selected={bin.content[index].screw.material}
          onSelected={(i) => {
            bin.content[index].screw.material = finishes[i];
            updateCallback(bin);
          }}
        />
        <Dropdown
          options={screwHeads}
          selected={bin.content[index].screw.head}
          onSelected={(i) => {
            bin.content[index].screw.head = screwHeads[i];
            updateCallback(bin);
          }}
        />
        <Dropdown
          options={screwDrive}
          selected={bin.content[index].screw.drive}
          onSelected={(i) => {
            bin.content[index].screw.drive = screwDrive[i];
            updateCallback(bin);
          }}
        />
        <Dropdown
          options={screwTypes}
          selected={bin.content[index].screw.type}
          onSelected={(i) => {
            bin.content[index].screw.type = screwTypes[i];
            updateCallback(bin);
          }}
        />
      </div>
    </div>
  );
}
