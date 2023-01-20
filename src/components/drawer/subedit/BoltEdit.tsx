import { boltHeads, finishes, SubEditProps } from "../SubEditProps";
import { Dropdown } from "../../Dropdown";
import React, { ChangeEvent } from "react";
import "./subEditStyle.css";
import { parseNumber } from "../../../util/utils";
import { TextBox } from "../../TextBox";

export function BoltEdit({ content, updateCallback }: SubEditProps) {
  return (
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
          margin: "1em",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <TextBox
          id="size"
          label="Size"
          defaultValue={content.bolt?.threadSize ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            content.bolt.threadSize = target.value;
            updateCallback();
          }}
          style={{ width: "110px" }}
        />
        <TextBox
          id="pitch"
          label="Pitch"
          defaultValue={content.bolt?.threadPitch ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            content.bolt.threadPitch = target.value;
            updateCallback();
          }}
          style={{ width: "110px" }}
        />
        <TextBox
          id="length"
          label="length"
          defaultValue={content.bolt?.length ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = (e.target as HTMLInputElement).value;
            content.bolt.length = parseNumber(target);
            updateCallback();
          }}
          style={{ width: "110px" }}
        />
      </div>
      <Dropdown
        options={finishes}
        selected={content.bolt?.material ?? ""}
        onSelected={(i) => {
          content.bolt.material = finishes[i];
          updateCallback();
        }}
      />
      <Dropdown
        options={boltHeads}
        selected={content.bolt.head}
        onSelected={(i) => {
          content.bolt.head = boltHeads[i];
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
