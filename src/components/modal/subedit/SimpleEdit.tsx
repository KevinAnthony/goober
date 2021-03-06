import { SubEditProps } from "../SubEditProps";
import { Box, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

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
      <Box component="form">
        <div
          style={{
            margin: "1em",
            display: "flex",
            gap: "10px",
          }}
        >
          <TextField
            id="size"
            variant="outlined"
            label="Description"
            defaultValue={bin.content[index].simple?.description ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              bin.content[index].simple.description = target.value;
              updateCallback(bin);
            }}
            style={{ width: "330" }}
          />
        </div>
      </Box>
    </div>
  );
}
