import React from "react";
import {
    Box, ButtonGroup, Button,
    Dialog, DialogTitle,
    TextField, ToggleButtonGroup, ToggleButton
} from "@mui/material";
import {indigo, red, green, amber, orange, blueGrey} from '@mui/material/colors';
import OutlinedBox from "./OutlinedBox";
import ColorButton from "./ColorButton";
import {rgb2hex, hex2rgb} from "../../util/formatting";
import Dropdown from "./Dropdown";
import {getBin} from "../../net/bin";

// TODO these should come from the backend
const finishes = ["stainless_steel", "black_oxide", "zinc", "yellow_zinc"]
const boltHeads = ["cap", "hex", "round"]
const screwHeads = ["round", "flat", "hex"]
const screwDrive = ["external_hex", "internal_hex", "phillips", "t25"]
const screwTypes = ["machine", "wood", "drywall", "self_tapping"]
const washerTypes = ["normal", "fender", "split_lock"]

export function BinEdit({
                            index,
                            bin,
                            closedCallback,
                            updateCallback,
                            saveCallback,
                            title = "Edit Bin"
                        }) {
    const [innerContainer, setContainer] = React.useState("")
    const [binState, setBin] = React.useState(bin)

    React.useEffect(() => {
        if (index >= 0) {
            setContainer(getFieldsForContent(binState, 0))
        }

        setBin(bin)
    }, [bin, index, binState])

    const [binRed, binBlue, binGreen, binYellow, binOrange, binGrey] =
        [red[500], indigo[500], green[500], amber[500], orange[500], blueGrey[500]]

    const [selectedColor, setSelectedColor] = React.useState(rgb2hex(bin.color.r, bin.color.b, bin.color.g));
    const [selectedUnit, setSelectedUnit] = React.useState(bin.unit);
    const handleColorChange = (event, newColor) => {
        setSelectedColor(newColor);
        binState.color = hex2rgb(newColor)
        setBin(binState)
        updateCallback(binState)
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
                <DialogTitle>{title}</DialogTitle>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                    <div>
                        <ToggleButtonGroup
                            color="primary"
                            value={binState.content_type}
                            exclusive
                            onChange={(e, newType) => {
                                binState.content_type = newType
                                switch (newType) {
                                    case "bolt":
                                        binState.bolt = {}
                                        break
                                    case "screw":
                                        binState.screw = {}
                                        break
                                    case "washer":
                                        binState.washer = {}
                                        break
                                    default:
                                        console.log("unknown type", newType)
                                }
                                setBin(binState)
                                setContainer(getFieldsForContent(binState, 0))

                            }}
                        >
                            <ToggleButton value="bolt">Bolt</ToggleButton>
                            <ToggleButton value="screw">Screw</ToggleButton>
                            <ToggleButton value="washer">Washer</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <Box component="form">
                        <div style={{
                            margin: "1em",
                            display: "flex",
                            gap: "10px"
                        }}>
                            <TextField
                                did="loc-x" variant="outlined" label="Location X" type="number"
                                defaultValue={binState.column_start_x} onClick={(e) => {
                                binState.column_start_x = parseInt(e.target.value)
                                updateCallback(binState)
                            }}
                                style={{width: "80px"}}/>
                            <TextField id="loc-y" variant="outlined" label="Location Y" type="number"
                                       defaultValue={binState.column_start_y} onClick={(e) => {
                                binState.column_start_y = parseInt(e.target.value)
                                updateCallback(binState)
                            }}
                                       style={{width: "80px"}}/>
                            <TextField id="width" variant="outlined" label="Width" type="number"
                                       defaultValue={binState.width} onClick={(e) => {
                                binState.width = parseInt(e.target.value)
                                updateCallback(binState)
                            }}
                                       style={{width: "80px"}}/>
                            <TextField id="height" variant="outlined" label="Height" type="number"
                                       defaultValue={binState.height} onClick={(e) => {
                                binState.height = parseInt(e.target.value)
                                updateCallback(binState)
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
                            binState.unit = newUnit
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
                                console.log(index, binState)
                                saveCallback(index, binState)
                                closedCallback()
                            }}
                        >Save</Button>
                        <Button
                            style={{
                                width: "16em",
                                height: "4em"
                            }}
                            onClick={() => {
                                getBin(binState).then(b => {
                                    console.log("get", b)
                                    updateCallback(b)
                                }).then(closedCallback())
                            }}
                        >Cancel</Button>
                    </ButtonGroup>
                </div>
            </Dialog>
        </div>
    );
}

function getFieldsForContent(bin, index, updateCallback) {
    switch (bin.content[index].content_type) {
        case undefined: {
            return <p>content_type undefined</p>
        }
        case "bolt":
            return getFieldsForBolt(bin.content[index], updateCallback)
        case "washer":
            return getFieldsForWasher(bin.content[index], updateCallback)
        case "screw":
            return getFieldsForScrew(bin.content[index], updateCallback)
        default:
            return <p>{`${bin.content[index].content_type} is undefined`}</p>
    }
}

function getFieldsForBolt(bin, updateCallback) {
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
                           defaultValue={bin.bolt.thread_size} onChange={(e) => {
                    bin.bolt.thread_size = e.target.value
                    updateCallback(bin)
                }}
                           style={{width: "110px"}}/>
                <TextField id="pitch" variant="outlined" label="Pitch"
                           defaultValue={bin.bolt.thread_pitch} onChange={(e) => {
                    bin.bolt.thread_pitch = e.target.value
                    updateCallback(bin)
                }}
                           style={{width: "110px"}}/>
                <TextField id="length" variant="outlined" label="length"
                           defaultValue={bin.bolt.length} onChange={(e) => {
                    bin.bolt.length = parseInt(e.target.value)
                    updateCallback(bin)
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
                <div>
                    <Dropdown options={finishes} selected={bin.bolt.material} style={{width: "350px"}}
                              onSelected={((index) => {
                                  bin.bolt.material = finishes[index]
                                  updateCallback(bin)
                              })}/>
                </div>
                <div>
                    <Dropdown options={boltHeads} selected={bin.bolt.head} style={{width: "350px"}}
                              onSelected={((index) => {
                                  bin.bolt.head = boltHeads[index]
                                  updateCallback(bin)
                              })}/>
                </div>
            </div>
        </Box>
    </div>
}

function getFieldsForWasher(bin, updateCallback) {
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
                           defaultValue={bin.washer.size} onChange={(e) => {
                    bin.washer.size = e.target.value
                    updateCallback(bin)
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
                <div>
                    <Dropdown options={finishes} selected={bin.washer.material} style={{width: "350px"}}
                              onSelected={((index) => {
                                  bin.washer.material = finishes[index]
                                  updateCallback(bin)
                              })}/>
                </div>
                <div>
                    <Dropdown options={washerTypes} selected={bin.washer.type} style={{width: "350px"}}
                              onSelected={((index) => {
                                  bin.washer.type = washerTypes[index]
                                  updateCallback(bin)
                              })}/>
                </div>
            </div>
        </Box>
    </div>
}

function getFieldsForScrew(bin, updateCallback) {
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
                           defaultValue={bin.screw.size} onChange={(e) => {
                    bin.screw.size = e.target.value
                    updateCallback(bin)
                }}
                           style={{width: "160px"}}/>
                <TextField id="length" variant="outlined" label="length"
                           defaultValue={bin.screw.length} onChange={(e) => {
                    bin.screw.length = e.target.value
                    updateCallback(bin)
                }}
                           style={{width: "160px"}}/>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
                <Dropdown options={finishes} selected={bin.screw.material} style={{width: "350px"}}
                          onSelected={((index) => {
                              bin.screw.material = finishes[index]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={screwHeads} selected={bin.screw.head} style={{width: "350px"}}
                          onSelected={((index) => {
                              bin.screw.head = screwHeads[index]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={screwDrive} selected={bin.screw.drive} style={{width: "350px"}}
                          onSelected={((index) => {
                              bin.screw.drive = screwDrive[index]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={screwTypes} selected={bin.screw.type} style={{width: "350px"}}
                          onSelected={((index) => {
                              bin.screw.type = screwTypes[index]
                              updateCallback(bin)
                          })}/>
            </div>
        </Box>
    </div>
}
