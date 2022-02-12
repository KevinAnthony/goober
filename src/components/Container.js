import React from 'react';
import Bin from './Bin.js';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import BackgroundGrid from './BackgroundGrid.js'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSave} from '@fortawesome/free-solid-svg-icons';
import {createBin, putBin} from "../net/bin";
import {BinNew} from "./modal/BinNew";
import {Typography} from "@mui/material";

function Container({container}) {
    function removeBin(index) {
        container.bins.splice(index, 1)

        setBins([...container.bins])
    }

    function updateBin(index, bin, save = true) {
        if (!save) {
            container.bins.splice(index, 1, bin)
            setBins([...container.bins])

            return
        }
        if (index >= container.bins.length) {
            bin.container_id = container.id

            createBin(bin).then((b) => {
                b.container_id = container.id
                container.bins.push(b)
                setBins([...container.bins])
            })
        } else {
            putBin(bin).then((b) => {
                container.bins.splice(index, 1, b)
                setBins([...container.bins])
            })
        }
    }

    const [editIndex, setEditIndex] = React.useState(-1);

    React.useEffect(() => {
        setEditIndex(-1);
    }, [])

    function handleBinEditClose() {
        setEditIndex(-1);
    }

    function handleBinEditOpen() {
        setEditIndex(container.bins.length + 1);
    }

    let gridGrid = Array(container.width).fill(null).map((_, posX) => (
        Array(parseInt(container.height)).fill(null).map((_, posY) => (
            <BackgroundGrid key={`grid-${posX}-${posY}`} a="0" x={posX} y={posY} width="1" height="1"/>
        ))
    ));

    const [bins, setBins] = React.useState([])
    React.useEffect(() => {
        setBins(container.bins)
    }, [container]);
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
                <Typography variant="h2" component="h2" style={{gridColumnStart: "2"}}>{container.box}</Typography>
                <div
                    style={{
                        gridColumnStart: "3",
                        display: "flex",
                        alignSelf: "center",
                        justify: "right:",
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
                    gridTemplateColumns: `repeat(${container.width}, 1${container.unit})`,
                    gridTemplateRows: `repeat(${container.height}, 1${container.unit})`,
                }}
            >
                {gridGrid}
                {
                    bins.map((bin, index) => (
                        <Bin
                            removeCallback={removeBin}
                            updateCallback={updateBin}
                            className="grid-bin"
                            key={`bin-${bin.id}`}
                            index={index}
                            container={container}
                            bin={bin}/>
                    ))
                }
            </div>
        </div>
        <BinNew index={editIndex} closedCallback={handleBinEditClose} updateCallback={updateBin}/>
    </>
}

export default Container
