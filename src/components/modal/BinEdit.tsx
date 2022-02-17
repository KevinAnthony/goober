import React from "react";
import {
    Box, ButtonGroup, Button,
    Dialog, DialogTitle,
    TextField, ToggleButtonGroup, ToggleButton
} from "@mui/material";
import {indigo, red, green, amber, orange, blueGrey} from '@mui/material/colors';
import {rgb2hex, hex2rgb} from "../../util/formatting";
import {BinObj} from "../../model/bin";
import OutlinedBox from "./OutlineBox";
import {ColorButton} from "./ColorButton";
import {BoltObj} from "../../model/bolt";
import {WasherObj} from "../../model/washer";
import {ScrewObj} from "../../model/screw";
import {BinNet} from "../../net/bin";
import {Dropdown} from "./Dropdown";
import {ContentObj} from "../../model/content";

// TODO these should come from the backend
const finishes = ["stainless_steel", "black_oxide", "zinc", "yellow_zinc"]
const boltHeads = ["cap", "hex", "round"]
const screwHeads = ["round", "flat", "hex"]
const screwDrive = ["external_hex", "internal_hex", "phillips", "t25"]
const screwTypes = ["machine", "wood", "drywall", "self_tapping"]
const washerTypes = ["normal", "fender", "split_lock"]

interface props {
    bin: BinObj,
    index: number,
    updateCallback: (bin: BinObj) => void,
    closedCallback: () => void,
    saveCallback: (index: number, bin: BinObj, save:boolean) => void
    title: string
}

export function BinEdit({
                            index,
                            bin,
                            closedCallback,
                            updateCallback,
                            saveCallback,
                            title
                        }: props) {
    const net = new BinNet()
    const [innerContainer, setContainer] = React.useState<JSX.Element>()
    const [binState, setBin] = React.useState<BinObj>(bin)
    const [content, setContent] = React.useState<ContentObj>(ContentObj.Empty())

    React.useEffect(() => {
        if (index >= 0) {
            setContainer(getFieldsForContent(binState, 0, updateCallback))
            setContent(bin.content[index])
        }

        setBin(bin)
    }, [bin, index, binState])

    const [binRed, binBlue, binGreen, binYellow, binOrange, binGrey] =
        [red[500], indigo[500], green[500], amber[500], orange[500], blueGrey[500]]

    const [selectedColor, setSelectedColor] = React.useState<string>(rgb2hex(bin.color));
    const [selectedUnit, setSelectedUnit] = React.useState<string>(bin.unit);
    const handleColorChange = (event: React.MouseEvent<HTMLElement>, newColor: string) => {
        console.log(event)
        setSelectedColor(newColor);
        binState.color = hex2rgb(newColor)
        setBin(binState)
        updateCallback(binState)
    };
console.log(index)
    console.log(content)
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
                            value={content.contentType}
                            exclusive
                            onChange={(_event: React.MouseEvent<HTMLElement>, newType: string) => {
                                content.contentType = newType
                                switch (newType) {
                                    case "bolt":
                                        content.bolt = BoltObj.Empty()
                                        break
                                    case "screw":
                                        content.screw = ScrewObj.Empty()
                                        break
                                    case "washer":
                                        content.washer = WasherObj.Empty()
                                        break
                                    default:
                                        console.log("unknown type", newType)
                                }
                                setBin(binState)
                                setContainer(getFieldsForContent(binState, 0, updateCallback) )

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
                                id="loc-x" variant="outlined" label="Location X" type="number"
                                defaultValue={binState.x} onClick={(e) => {
                                    console.dir(e)
                                // binState.x = e.target.value
                                updateCallback(binState)
                            }}
                                style={{width: "80px"}}/>
                            <TextField id="loc-y" variant="outlined" label="Location Y" type="number"
                                       defaultValue={binState.y} onClick={(_e) => {
                                // binState.y = parseInt(e.target.value)
                                updateCallback(binState)
                            }}
                                       style={{width: "80px"}}/>
                            <TextField id="width" variant="outlined" label="Width" type="number"
                                       defaultValue={binState.width} onClick={(_e) => {
                                // binState.width = parseInt(e.target.value)
                                updateCallback(binState)
                            }}
                                       style={{width: "80px"}}/>
                            <TextField id="height" variant="outlined" label="Height" type="number"
                                       defaultValue={binState.height} onClick={(_e) => {
                                // binState.height = parseInt(e.target.value)
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
                                <ColorButton color={binRed} selected={selectedColor}/>
                                <ColorButton color={binBlue} selected={selectedColor}/>
                                <ColorButton color={binGreen} selected={selectedColor}/>
                                <ColorButton color={binYellow} selected={selectedColor}/>
                                <ColorButton color={binOrange} selected={selectedColor}/>
                                <ColorButton color={binGrey} selected={selectedColor}/>
                            </div>
                        </ToggleButtonGroup>
                    </OutlinedBox>
                    <ToggleButtonGroup
                        color="primary"
                        value={selectedUnit}
                        exclusive
                        onChange={(_e, newUnit: string) => {
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
                                saveCallback(index, binState, true)
                                closedCallback()
                            }}
                        >Save</Button>
                        <Button
                            style={{
                                width: "16em",
                                height: "4em"
                            }}
                            onClick={() => {
                                net.putBin(binState).then(b => {
                                    updateCallback(b)
                                }).then(() => closedCallback())
                            }}
                        >Cancel</Button>
                    </ButtonGroup>
                </div>
            </Dialog>
        </div>
    );
}

function getFieldsForContent(bin: BinObj, index:number, updateCallback: (bin: BinObj) => void): JSX.Element {
    switch (bin.content[index].contentType) {
        case undefined: {
            return <p>content_type undefined</p>
        }
        case "bolt":
            return getFieldsForBolt(bin,index, updateCallback)
        case "washer":
            return getFieldsForWasher(bin,index, updateCallback)
        case "screw":
            return getFieldsForScrew(bin,index, updateCallback)
        default:
            return <p>{`${bin.content[index].contentType} is undefined`}</p>
    }
}

function getFieldsForBolt(bin: BinObj,index:number, updateCallback: (bin: BinObj) => void):JSX.Element {
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
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
                <div>
                    <Dropdown options={finishes} selected={bin.content[index].bolt?.material ?? ""}
                              style={{width: "350px"}}
                              onSelected={(index) => {
                                  bin.content[index].bolt.material = finishes[index]
                                  updateCallback(bin)
                              }}/>
                </div>
                <div>
                    <Dropdown options={boltHeads} selected={bin.content[index].bolt.head} style={{width: "350px"}}
                              onSelected={((index) => {
                                  bin.content[index].bolt.head = boltHeads[index]
                                  updateCallback(bin)
                              })}/>
                </div>
            </div>
        </Box>
    </div>
}

function getFieldsForWasher(bin: BinObj, index:number, updateCallback: (bin: BinObj) => void):JSX.Element {
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
                           defaultValue={bin.content[index].washer?.size ?? ""} onChange={(_e) => {
                    // bin.washer.size = e.target.value
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
                    <Dropdown options={finishes} selected={bin.content[index].washer.material} style={{width: "350px"}}
                              onSelected={((index) => {
                                  bin.content[index].washer.material = finishes[index]
                                  updateCallback(bin)
                              })}/>
                </div>
                <div>
                    <Dropdown options={washerTypes} selected={bin.content[index].washer.type} style={{width: "350px"}}
                              onSelected={((index) => {
                                  bin.content[index].washer.type = washerTypes[index]
                                  updateCallback(bin)
                              })}/>
                </div>
            </div>
        </Box>
    </div>
}

function getFieldsForScrew(bin: BinObj,index:number, updateCallback: (bin: BinObj) => void):JSX.Element {
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
                           defaultValue={bin.content[index].screw?.size ?? ""} onChange={(_e) => {
                    // bin.content[index].screw.size = e.target.value
                    updateCallback(bin)
                }}
                           style={{width: "160px"}}/>
                <TextField id="length" variant="outlined" label="length"
                           defaultValue={bin.content[index].screw?.length ?? ""} onChange={(_e) => {
                    // bin.content[index].screw.length = e.target.value
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
                <Dropdown options={finishes} selected={bin.content[index].screw.material} style={{width: "350px"}}
                          onSelected={((index) => {
                              bin.content[index].screw.material = finishes[index]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={screwHeads} selected={bin.content[index].screw.head} style={{width: "350px"}}
                          onSelected={((index) => {
                              bin.content[index].screw.head = screwHeads[index]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={screwDrive} selected={bin.content[index].screw.drive} style={{width: "350px"}}
                          onSelected={((index) => {
                              bin.content[index].screw.drive = screwDrive[index]
                              updateCallback(bin)
                          })}/>
                <Dropdown options={screwTypes} selected={bin.content[index].screw.type} style={{width: "350px"}}
                          onSelected={((index) => {
                              bin.content[index].screw.type = screwTypes[index]
                              updateCallback(bin)
                          })}/>
            </div>
        </Box>
    </div>
}
