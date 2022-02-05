import React from "react";
import {
    Box, ButtonGroup, Button,
    Dialog, DialogTitle,
    Menu, MenuItem,
    TextField, ToggleButtonGroup, ToggleButton
} from "@mui/material";
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import {indigo, red, green, amber, orange, blueGrey} from '@mui/material/colors';
import OutlinedBox from "./OutlinedBox";
import ColorButton from "./ColorButton";
import {rgb2hex, hex2rgb} from "../util/formatting";
import Dropdown from "./Dropdown";

// TODO these should come from the backend
const finishes = ["stainless_steel", "black_oxide", "zinc", "yellow_zinc"]
const boltHeads = ["cap", "hex", "round"]
const screwHeads = ["round", "flat", "hex"]
const screwDrive = ["external_hex", "internal_hex", "phillips", "t25"]
const screwTypes = ["machine", "wood", "drywall", "self_tapping"]
const washerTypes = ["normal", "fender", "split"]

function BinEdit({index, bin, closedCallback, updateCallback}) {
    let innerContainer = ""

    if (index >= 0) {
        innerContainer = getFieldsForContent(bin.content)
    }

    const [binRed, binBlue, binGreen, binYellow, binOrange, binGrey] =
        [red[500], indigo[500], green[500], amber[500], orange[500], blueGrey[500]]

    const [selectedColor, setSelectedColor] = React.useState(rgb2hex(bin.color.R, bin.color.B, bin.color.G));
    const [selectedUnit, setSelectedUnit] = React.useState(bin.content.unit);
    const handleColorChange = (event, newColor) => {
        setSelectedColor(newColor);
        bin.color = hex2rgb(newColor)
    };

    return (
        <div style={{
            position: 'absolute',
            backgroundColor: 'rgb(77,77,77,1)',
        }}>
            <Dialog
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={index >= 0}
                onClose={closedCallback}
            >
                <DialogTitle>Edit Bin</DialogTitle>
                <div style={{
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
                            <TextField
                                did="loc-x" variant="outlined" label="Location X" type="number"
                                defaultValue={bin.start_x} onClick={(e) => {
                                bin.start_x = parseInt(e.target.value)
                            }}
                                style={{width: "80px"}}/>
                            <TextField id="loc-y" variant="outlined" label="Location Y" type="number"
                                       defaultValue={bin.start_y} onClick={(e) => {
                                bin.start_y = parseInt(e.target.value)
                            }}
                                       style={{width: "80px"}}/>
                            <TextField id="width" variant="outlined" label="Width" type="number"
                                       defaultValue={bin.width} onClick={(e) => {
                                bin.width = parseInt(e.target.value)
                            }}
                                       style={{width: "80px"}}/>
                            <TextField id="height" variant="outlined" label="Height" type="number"
                                       defaultValue={bin.height} onClick={(e) => {
                                bin.height = parseInt(e.target.value)
                            }} style={{width: "80px"}}/>
                        </div>
                    </Box>
                    <OutlinedBox label="Color Picker"
                                 style={{
                                     margin: "20px",
                                 }}>
                        <ToggleButtonGroup
                            value={selectedColor}
                            exclusive
                            disabled
                            onChange={handleColorChange}
                        >
                            <div style={{
                                margin: "1em",
                                display: "flex",
                                gap: "10px"
                            }}>
                                <ColorButton onChange={handleColorChange} color={binRed} selected={selectedColor}/>
                                <ColorButton onChange={handleColorChange} color={binBlue} selected={selectedColor}/>
                                <ColorButton onChange={handleColorChange} color={binGreen}
                                             selected={selectedColor}/>
                                <ColorButton onChange={handleColorChange} color={binYellow}
                                             selected={selectedColor}/>
                                <ColorButton onChange={handleColorChange} color={binOrange}
                                             selected={selectedColor}/>
                                <ColorButton onChange={handleColorChange} color={binGrey} selected={selectedColor}/>
                            </div>
                        </ToggleButtonGroup>
                    </OutlinedBox>
                    <ToggleButtonGroup
                        color="primary"
                        value={selectedUnit}
                        exclusive
                        onChange={(e, newUnit) => {
                            setSelectedUnit(newUnit)
                            bin.content.unit = newUnit
                        }}
                    >
                        <ToggleButton value="in">Imperial</ToggleButton>
                        <ToggleButton value="mm">Metric</ToggleButton>
                        <ToggleButton value="an">AN</ToggleButton>
                    </ToggleButtonGroup>
                    {innerContainer}
                    <ButtonGroup
                        aria-label="contained button group"
                        variant="contained"
                        style={{
                            margin: "1em",
                        }}
                    >
                        <Button
                            style={{
                                width: "16em",
                                height: "4em"
                            }}
                            onClick={() => {
                                updateCallback(index, bin)
                                closedCallback()
                            }}
                        >Save</Button>
                        <Button
                            style={{
                                width: "16em",
                                height: "4em"
                            }}
                            onClick={() => {
                                closedCallback()
                            }}
                        >Cancel</Button>
                    </ButtonGroup>
                </div>
            </Dialog>
        </div>
    );
}

export default BinEdit

function getFieldsForContent(content) {
    switch (content.type) {
        case undefined: {
            return <p>TypePicker</p>
        }
        case "bolt":
            return getFieldsForBolt(content.bolt)
        case "washer":
            return getFieldsForWasher(content.washer)
        case "screw":
            return getFieldsForScrew(content.screw)
        default:
            return <p>{`${content.type} is undefined`}</p>
    }
}

function getFieldsForBolt(bolt) {
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
                           defaultValue={bolt.thread_size} onClick={(e) => {
                    bolt.thread_size = e.target.value
                }}
                           style={{width: "110px"}}/>
                <TextField id="pitch" variant="outlined" label="Pitch"
                           defaultValue={bolt.thread_pitch} onClick={(e) => {
                    bolt.thread_pitch = e.target.value
                }}
                           style={{width: "110px"}}/>
                <TextField id="length" variant="outlined" label="length"
                           defaultValue={bolt.length} onClick={(e) => {
                    bolt.length = e.target.value
                }}
                           style={{width: "110px"}}/>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
                <Dropdown options={finishes} selected={bolt.finish} style={{width: "350px"}}
                          onSelected={((index) => bolt.finish = finishes[index])}/>
                <Dropdown options={boltHeads} selected={bolt.head} style={{width: "350px"}}
                          onSelected={((index) => bolt.head = boltHeads[index])}/>
            </div>
        </Box>
    </div>
}

function getFieldsForWasher(washer) {
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
                           defaultValue={washer.size} onClick={(e) => {
                    washer.size = e.target.value
                }}
                           style={{width: "330"}}/>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
                <Dropdown options={finishes} selected={washer.finish} style={{width: "350px"}}
                          onSelected={((index) => washer.finish = finishes[index])}/>
                <Dropdown options={washerTypes} selected={washer.type} style={{width: "350px"}}
                          onSelected={((index) => washer.type = washerTypes[index])}/>
            </div>
        </Box>
    </div>
}

function getFieldsForScrew(screw) {
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
                           defaultValue={screw.size} onClick={(e) => {
                    screw.size = e.target.value
                }}
                           style={{width: "160px"}}/>
                <TextField id="length" variant="outlined" label="length"
                           defaultValue={screw.length} onClick={(e) => {
                    screw.length = e.target.value
                }}
                           style={{width: "160px"}}/>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
                <Dropdown options={finishes} selected={screw.finish} style={{width: "350px"}}
                          onSelected={((index) => screw.finish = finishes[index])}/>
                <Dropdown options={screwHeads} selected={screw.head} style={{width: "350px"}}
                          onSelected={((index) => screw.head = screwHeads[index])}/>
                <Dropdown options={screwDrive} selected={screw.drive} style={{width: "350px"}}
                          onSelected={((index) => screw.drive = screwDrive[index])}/>
                <Dropdown options={screwTypes} selected={screw.type} style={{width: "350px"}}
                          onSelected={((index) => screw.type = screwTypes[index])}/>
            </div>
        </Box>
    </div>
}
