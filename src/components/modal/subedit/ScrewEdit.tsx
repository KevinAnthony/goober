import {finishes, screwDrive, screwHeads, screwTypes, SubEditProps} from "../SubEditProps";
import {Box, TextField} from "@mui/material";
import {Dropdown} from "../Dropdown";
import React, {ChangeEvent} from "react";

export function ScrewEdit({bin, index, updateCallback}: SubEditProps) {
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
                           defaultValue={bin.content[index].screw?.size ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    bin.content[index].screw.size = target.value
                    updateCallback(bin)
                }}
                           style={{width: "160px"}}/>
                <TextField id="length" variant="outlined" label="length"
                           defaultValue={bin.content[index].screw?.length ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    bin.content[index].screw.length = parseInt(target.value)
                    updateCallback(bin)
                }}
                           style={{width: "160px"}}/>
            </div>
            <div>
                <Dropdown options={finishes} selected={bin.content[index].screw.material} className={"topDropdown"}
                          onSelected={((i) => {
                              bin.content[index].screw.material = finishes[i]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={screwHeads} selected={bin.content[index].screw.head} className={"middleDropdown"}
                          onSelected={((i) => {
                              bin.content[index].screw.head = screwHeads[i]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={screwDrive} selected={bin.content[index].screw.drive} className={"middleDropdown"}
                          onSelected={((i) => {
                              bin.content[index].screw.drive = screwDrive[i]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={screwTypes} selected={bin.content[index].screw.type} className={"bottomDropdown"}
                          onSelected={((i) => {
                              bin.content[index].screw.type = screwTypes[i]
                              updateCallback(bin)
                          })}/>
            </div>
        </Box>
    </div>
}
