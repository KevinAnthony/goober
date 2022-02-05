import React from 'react';
import Bin from './Bin.js';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import BackgroundGrid from './BackgroundGrid.js'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSave} from '@fortawesome/free-solid-svg-icons';
import BinEdit from "./modal/BinEdit";

function Container({container}) {
    function addBin() {
        container.bins.push({
            color: {R: 0, G: 255, B: 255},
            height: 5,
            width: 5,
            start_x: 10,
            start_y: 20,
            content: {
                type: "screw",
                screw: {
                    unit: "in",
                    length: 5,
                    size: "#10",
                    type: "drywall",
                    head: "round",
                    drive: "phillips",
                    finish: "black_oxide"
                }
            },
        },)
        setBins([...container.bins])
    }

    function removeBin(index) {
        container.bins.splice(index, 1)

        setBins([...container.bins])
    }

    function updateBin(index, bin) {
        container.bins.splice(index, 1, bin)

        setBins([...container.bins])
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
    return <div>
        <div
            style={{
                background: `rgb(${container.color.R}, ${container.color.G}, ${container.color.B})`
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
                <div style={{gridColumnStart: "2"}}>{container.box}</div>
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
                            onClick={addBin}
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
                            key={`bin-${bin.start_x}-${bin.start_y}`}
                            index={index}
                            container={container}
                            bin={bin}/>
                    ))
                }
            </div>
        </div>

    </div>
}

export default Container
