import {boltHeads, finishes, SubEditProps} from "../SubEditProps";
import {Box, TextField} from "@mui/material";
import {Dropdown} from "../Dropdown";
import React, {ChangeEvent} from "react";
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
                           defaultValue={bin.content[index].bolt?.threadSize ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    bin.content[index].bolt.threadSize = target.value
                    updateCallback(bin)
                }}
                           style={{width: "110px"}}/>
                <TextField id="pitch" variant="outlined" label="Pitch"
                           defaultValue={bin.content[index].bolt?.threadPitch ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    bin.content[index].bolt.threadPitch = target.value
                    updateCallback(bin)
                }}
                           style={{width: "110px"}}/>
                <TextField id="length" variant="outlined" label="length"
                           defaultValue={bin.content[index].bolt?.length ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    bin.content[index].bolt.length = parseInt(target.value)
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
