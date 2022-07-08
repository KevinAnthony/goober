import { finishes, SubEditProps } from "../SubEditProps";
import { Box, TextField } from "@mui/material";
import { Dropdown } from "../Dropdown";
import React, { ChangeEvent } from "react";
import "./subEditStyle.css";
import { parseNumber } from "../../../util/utils";

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
      <Box component="form">
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
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <TextField
              id="gauge"
              variant="outlined"
              label="Gauge"
              defaultValue={bin.content[index].nail?.gauge ?? ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const target = e.target as HTMLInputElement;
                bin.content[index].nail.gauge = target.value;
                updateCallback(bin);
              }}
              style={{ width: "110px" }}
            />
            <TextField
              id="length"
              variant="outlined"
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
            className={"topDropdown"}
            onSelected={(i) => {
              bin.content[index].nail.material = finishes[i];
              updateCallback(bin);
            }}
          />
          <TextField
            id="size"
            variant="outlined"
            label="Description"
            className={"bottomDropdown"}
            defaultValue={bin.content[index].nail?.description ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              bin.content[index].nail.description = target.value;
              updateCallback(bin);
            }}
          />
        </div>
      </Box>
    </div>
  );
}
