import { nutTypes, finishes, SubEditProps } from "../SubEditProps";
import { Box, TextField } from "@mui/material";
import { Dropdown } from "../../Dropdown";
import React, { ChangeEvent } from "react";
import "./subEditStyle.css";

export function NutEdit({ bin, index, updateCallback }: SubEditProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="form">
        <div
          style={{
            margin: "1em",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <TextField
            id="size"
            variant="outlined"
            label="Size"
            defaultValue={bin.content[index].nut?.threadSize ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              bin.content[index].nut.threadSize = target.value;
              updateCallback(bin);
            }}
            style={{ width: "110px" }}
          />
          <TextField
            id="pitch"
            variant="outlined"
            label="Pitch"
            defaultValue={bin.content[index].nut?.threadPitch ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              bin.content[index].nut.threadPitch = target.value;
              updateCallback(bin);
            }}
            style={{ width: "110px" }}
          />
        </div>
        <div>
          <Dropdown
            options={nutTypes}
            selected={bin.content[index].nut.type}
            onSelected={(i) => {
              bin.content[index].nut.type = nutTypes[i];
              updateCallback(bin);
            }}
          />
          <Dropdown
            options={finishes}
            selected={bin.content[index].nut?.material ?? ""}
            onSelected={(i) => {
              bin.content[index].nut.material = finishes[i];
              updateCallback(bin);
            }}
          />
          <TextField
            id="size"
            variant="outlined"
            label="Description"
            defaultValue={bin.content[index].nut?.description ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              bin.content[index].nut.description = target.value;
              updateCallback(bin);
            }}
          />
        </div>
      </Box>
    </div>
  );
}
