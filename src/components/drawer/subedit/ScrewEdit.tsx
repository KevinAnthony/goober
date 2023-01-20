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

export function ScrewEdit({ content, updateCallback }: SubEditProps) {
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
          defaultValue={content.screw?.size ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            content.screw.size = target.value;
            updateCallback();
          }}
        />
        <TextBox
          id="length"
          label="Length"
          defaultValue={content.screw?.length ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            content.screw.length = parseNumber(target.value);
            updateCallback();
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
          selected={content.screw.material}
          onSelected={(i) => {
            content.screw.material = finishes[i];
            updateCallback();
          }}
        />
        <Dropdown
          options={screwHeads}
          selected={content.screw.head}
          onSelected={(i) => {
            content.screw.head = screwHeads[i];
            updateCallback();
          }}
        />
        <Dropdown
          options={screwDrive}
          selected={content.screw.drive}
          onSelected={(i) => {
            content.screw.drive = screwDrive[i];
            updateCallback();
          }}
        />
        <Dropdown
          options={screwTypes}
          selected={content.screw.type}
          onSelected={(i) => {
            content.screw.type = screwTypes[i];
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
    </div>
  );
}
