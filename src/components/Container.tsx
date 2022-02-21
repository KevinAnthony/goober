import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Typography} from "@mui/material";
import {ContainerObj} from "../model/container";
import {BackgroundGrid} from "./BackgroundGrid";
import {ColorObj} from "../model/color";
import {BinObj} from "../model/bin";
import {BinNet} from "../net/bin";
import {Bin} from "./Bin";
import {BinEdit} from "./modal/BinEdit";
import {ContentObj} from "../model/content";
import {BoltObj} from "../model/bolt";
import {hex2rgb} from "../util/formatting";
import {red} from "@mui/material/colors";
import {isEmpty} from "../util/utils";

interface props {
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

    function drawNewBin(bin: BinObj) {
        setNewBin(bin)
        setNewBinIndex(newBinIndex)
        setRedrawBin(true)

        return
    }

    function saveBin(index: number, bin: BinObj, save: boolean) {
        if (!save) {
            container.bin.splice(index, 1, bin)
            setBins([...container.bin])

            return
        }

        if (isEmpty(bin.id)) {
            bin.containerID = container.id

            binNet.createBin(bin).then((b: BinObj) => {
                container.bin.push(b)
                setBins([...container.bin])
            })
        } else {
            binNet.putBin(bin).then((b: BinObj) => {
                container.bin.splice(index, 1, b)
                setBins([...container.bin])
            })
        }
    }

    const [newBinIndex, setNewBinIndex] = React.useState<number>(-1);
    const [newBin, setNewBin] = React.useState<BinObj>(createNewBin());
    const [redrawBin, setRedrawBin] = React.useState<boolean>(false);
    const [newBinObject, setNewBinObject] = React.useState<JSX.Element>(<div/>);

    const memoizedRemoveBin = React.useCallback((index: number) => {
        removeBin(index)
    }, [])
    const memoizedSaveBin = React.useCallback((index: number, bin: BinObj, save: boolean) => {
        saveBin(index, bin, save)
    }, [])

    React.useEffect(() => {
        setRedrawBin(false)

        if (newBinIndex < 0) {
            setNewBinObject(<div/>)
        } else {
            setNewBinObject(<Bin
                bin={newBin}
                index={newBinIndex}
                removeCallback={memoizedRemoveBin}
                updateCallback={memoizedSaveBin}/>)
        }
    }, [newBinIndex, newBin, redrawBin, memoizedRemoveBin, memoizedSaveBin])

    function createNewBin(): BinObj {
        const newContent = ContentObj.Empty()
        newContent.contentType = "bolt"
        newContent.bolt = BoltObj.Empty()

        const newBin = BinObj.Empty()
        newBin.content.push(newContent)
        newBin.width = 5
        newBin.height = 5
        newBin.x = 0
        newBin.y = 0
        newBin.color = hex2rgb(red[500])

        return newBin
    }

    function handleNewBinClosed() {
        setNewBinIndex(-1);
        setNewBin(createNewBin())
    }

    function handleNewBinOpen() {
        setNewBinIndex(container.bin.length + 1);
    }


    let gridGrid = Array(container.width).fill(null).map((_, posX) => (
        Array(container.height).fill(null).map((_, posY) => (
            <BackgroundGrid key={`grid-${posX}-${posY}`} background={ColorObj.Parse({a: 0})} x={posX} y={posY}/>
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
                            onClick={handleNewBinOpen}
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
                            }}><FontAwesomeIcon icon={faCog}/></Button>
                        <Button
                            style={{
                                padding: "4px",
                                width: "4em",
                                height: "4em",
                            }}
                            onClick={() => {
                            }}><FontAwesomeIcon icon={faTrash}/></Button>
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
                    bins.map((bin: BinObj, index: number) => (
                        <Bin
                            removeCallback={removeBin}
                            updateCallback={saveBin}
                            key={`bin-${bin.id}`}
                            index={index}
                            bin={bin}/>
                    ))
                }
                {newBinObject}
            </div>
        </div>
        <BinEdit
            bin={newBin}
            title={"New Bin"}
            binIndex={newBinIndex}
            closedCallback={handleNewBinClosed}
            updateCallback={drawNewBin}
            removeCallback={removeBin}
            saveCallback={saveBin}/>
    </>
}

