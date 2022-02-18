import {boltHeads, finishes, SubEditProps} from "../SubEditProps";
import {Box, TextField} from "@mui/material";
import {Dropdown} from "../Dropdown";
import React from "react";
import "./subEditStyle.css"

export function BoltEdit({bin, index, updateCallback}: SubEditProps) {
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
                justifyContent:"center",
                gap: "10px"
            }}>
                <TextField id="size" variant="outlined" label="Size"
                           defaultValue={bin.content[index].bolt?.threadSize ?? ""} onChange={(_e) => {
                    // bin.bolt.thread_size = e.target.value
                    updateCallback(bin)
                }}
                           style={{width: "110px"}}/>
                <TextField id="pitch" variant="outlined" label="Pitch"
                           defaultValue={bin.content[index].bolt?.threadPitch ?? ""} onChange={(_e) => {
                    // bin.bolt.thread_pitch = e.target.value
                    updateCallback(bin)
                }}
                           style={{width: "110px"}}/>
                <TextField id="length" variant="outlined" label="length"
                           defaultValue={bin.content[index].bolt?.length ?? ""} onChange={(_e) => {
                    // bin.bolt.length = parseInt(e.target.value)
                    updateCallback(bin)
                }}
                           style={{width: "110px"}}/>
            </div>
            <div>
                    <Dropdown options={finishes}
                              selected={bin.content[index].bolt?.material ?? ""}
                              className={"topDropdown"}
                              onSelected={(i) => {
                                  bin.content[index].bolt.material = finishes[i]
                                  updateCallback(bin)
                              }}/>
                    <Dropdown options={boltHeads}
                              selected={bin.content[index].bolt.head}
                              className={"bottomDropdown"}
                              onSelected={((i) => {
                                  bin.content[index].bolt.head = boltHeads[i]
                                  updateCallback(bin)
                              })}/>
            </div>
        </Box>
    </div>
}
