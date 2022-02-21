import {Box, TextField} from "@mui/material";
import {Dropdown} from "../Dropdown";
import React, {ChangeEvent} from "react";
import {finishes, SubEditProps, washerTypes} from "../SubEditProps";

export function WasherEdit({bin, index, updateCallback}: SubEditProps) {
    return <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    }}
    >
        <Box component="form">
            <div style={{
                margin: "1em",
                display: "flex",
                gap: "10px"
            }}>
                <TextField id="size" variant="outlined" label="Size"
                           defaultValue={bin.content[index].washer?.size ?? ""}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               const target = e.target as HTMLInputElement
                               bin.content[index].washer.size = target.value
                               updateCallback(bin)
                           }}
                           style={{width: "330"}}/>
            </div>
            <div>
                <Dropdown options={finishes} selected={bin.content[index].washer.material} className={"topDropdown"}
                          onSelected={((i) => {
                              bin.content[index].washer.material = finishes[i]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={washerTypes} selected={bin.content[index].washer.type} className={"bottomDropdown"}
                          onSelected={((i) => {
                              bin.content[index].washer.type = washerTypes[i]
                              updateCallback(bin)
                          })}/>
            </div>
        </Box>
    </div>
}
