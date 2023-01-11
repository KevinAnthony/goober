import { boltHeads, finishes, SubEditProps } from "../SubEditProps";
import { Dropdown } from "../../Dropdown";
import React, { ChangeEvent } from "react";
import "./subEditStyle.css";
import { parseNumber } from "../../../util/utils";
import { TextBox } from "../../TextBox";

export function BoltEdit({ bin, index, updateCallback }: SubEditProps) {
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
          defaultValue={bin.content[index].bolt?.threadSize ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            bin.content[index].bolt.threadSize = target.value;
            updateCallback(bin);
          }}
          style={{ width: "110px" }}
        />
        <TextBox
          id="pitch"
          label="Pitch"
          defaultValue={bin.content[index].bolt?.threadPitch ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            bin.content[index].bolt.threadPitch = target.value;
            updateCallback(bin);
          }}
          style={{ width: "110px" }}
        />
        <TextBox
          id="length"
          label="length"
          defaultValue={bin.content[index].bolt?.length ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const target = (e.target as HTMLInputElement).value;
            bin.content[index].bolt.length = parseNumber(target);
            updateCallback(bin);
          }}
          style={{ width: "110px" }}
        />
      </div>
      <Dropdown
        options={finishes}
        selected={bin.content[index].bolt?.material ?? ""}
        onSelected={(i) => {
          bin.content[index].bolt.material = finishes[i];
          updateCallback(bin);
        }}
      />
      <Dropdown
        options={boltHeads}
        selected={bin.content[index].bolt.head}
        onSelected={(i) => {
          bin.content[index].bolt.head = boltHeads[i];
          updateCallback(bin);
        }}
      />
      <TextBox
        id="size"
        label="Description"
        defaultValue={bin.content[index].nut?.description ?? ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;
          bin.content[index].nut.description = target.value;
          updateCallback(bin);
        }}
        style={{ width: "300px" }}
      />
    </div>
  );
}
