import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSave} from '@fortawesome/free-solid-svg-icons';
import {Typography} from "@mui/material";
import {ContainerObj} from "../model/container";
import {BackgroundGrid} from "./BackgroundGrid";
import {ColorObj} from "../model/color";
import {BinObj} from "../model/bin";
import {BinNet} from "../net/bin";
import {Bin} from "./Bin";

interface props  {
    container: ContainerObj,
}

export function Container({container}: props) {
    const [bins, setBins] = React.useState(() => container.bin)

    const binNet = new BinNet()

    React.useEffect(() => {
        setBins(container.bin)
    }, [container]);

    function removeBin(index: number) {
        container.bin.splice(index, 1)

        setBins([...container.bin])
    }

    function updateBin(index: number, bin: BinObj, save: boolean) {
        if (!save) {
            container.bin.splice(index, 1, bin)
            setBins([...container.bin])

            return
        }
        if (index >= container.bin.length) {
            bin.containerID = container.id

            binNet.createBin(bin).then((b:BinObj) => {
                b.containerID = container.id
                container.bin.push(b)
                setBins([...container.bin])
            })
        } else {
            binNet.putBin(bin).then((b:BinObj) => {
                container.bin.splice(index, 1, b)
                setBins([...container.bin])
            })
        }
    }

    // const [editIndex, setEditIndex] = React.useState(-1);
    const [_, setEditIndex] = React.useState(-1);

    React.useEffect(() => {
        setEditIndex(-1);
    }, [])

    // function handleBinEditClose() {
    //     setEditIndex(-1);
    // }

    function handleBinEditOpen() {
        setEditIndex(container.bin.length + 1);
    }
    let gridGrid = Array(container.width).fill(null).map((_, posX) => (
        Array(container.height).fill(null).map((_, posY) => (
            <BackgroundGrid key={`grid-${posX}-${posY}`} background={ColorObj.Parse({a:0})} x={posX} y={posY}/>
        ))
    ));


    return <>
        <div
            style={{
                background: `rgb(${container.color.r}, ${container.color.g}, ${container.color.b})`
            }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `1fr auto 1fr`,
                    fontSize: "32pt",
                    fontFamily: "Helvetica, sans-serif",
                    color: "white",
                    textAlign: "center",
                    padding: "10px"
                }}>
                <Typography variant="h2" component="h2" style={{gridColumnStart: "2"}}>{container.label}</Typography>
                <div
                    style={{
                        gridColumnStart: "3",
                        display: "flex",
                        alignSelf: "center",
                        justifyContent: "right",
                        flexFlow: "row-reverse",
                    }}>

                    <ButtonGroup variant="contained" aria-label="outlined contained button group">
                        <Button
                            onClick={handleBinEditOpen}
                            style={{
                                padding: "4px",
                                width: "4em",
                                height: "4em",
                            }}
                        ><FontAwesomeIcon icon={faPlus}/></Button>
                        <Button
                            style={{
                                padding: "4px",
                                width: "4em",
                                height: "4em",
                            }}
                            onClick={() => {
                            }}><FontAwesomeIcon icon={faSave}/></Button>
                    </ButtonGroup>
                </div>
            </div>
            <div
                className={'grid-container'}
                style={{
                    width: `${container.width}${container.unit}`,
                    height: `${container.height}${container.unit}`,
                    gridTemplateColumns: `repeat(${container.width}, 1${container.unit})`,
                    gridTemplateRows: `repeat(${container.height}, 1${container.unit})`,
                }}
            >
                {gridGrid}
                {
                    bins.map((bin:BinObj, index:number) => (
                        <Bin
                            removeCallback={removeBin}
                            updateCallback={updateBin}
                            key={`bin-${bin.id}`}
                            index={index}
                            bin={bin}/>
                    ))
                }
            </div>
        </div>
        {/*<BinNew index={editIndex} closedCallback={handleBinEditClose} updateCallback={updateBin}/>*/}
    </>
}

