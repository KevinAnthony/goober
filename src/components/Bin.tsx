import React from 'react';
import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faCog} from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "@mui/material/ButtonGroup";
import {BinObj} from "../model/bin";
import {ColorObj} from "../model/color";

interface Props {
    bin: BinObj,
    index: number,
    removeCallback: (index: number) => void,
    updateCallback: (index: number, bin: BinObj, save:boolean) => void,
}

// @ts-ignore
export function Bin({removeCallback, updateCallback, bin, index}: Props) {

    const [color, setColor] = React.useState<ColorObj>(bin.color)
    const [startX, setStartX] = React.useState<number>(bin.x + 1)
    const [startY, setStartY] = React.useState<number>(bin.y + 1)
    const [stopX, setStopX] = React.useState<number>(bin.x + 1 + bin.width)
    const [stopY, setStopY] = React.useState<number>(bin.y + 1 + bin.height)
    console.log(startX, stopX, startY, stopY)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const [editIndex, setEditIndex] = React.useState<number>();

    React.useEffect(() => {
        setEditIndex(-1);
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    function handleBinEditClose() {
        setEditIndex(-1);
    }

    function handleBinEditOpen(index: number) {
        setEditIndex(index);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    function handleRedraw(b: BinObj) {
        setColor(b.color)
        setStartX((b.x + 1))
        setStartY((b.y + 1))
        setStopX((b.x + 1 + b.width))
        setStopY((b.y + 1 + b.height))
    }

    return <div
        className='grid-bin'
        style={{
            gridColumnStart: startX,
            gridColumnEnd: stopX,
            gridRowStart: startY,
            gridRowEnd: stopY,
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}
    >
        <ButtonGroup fullWidth={true} variant="contained" aria-label="outlined contained button group">
            <Button
                style={{
                    padding: "4px",
                    height: "3em",
                }}

                onClick={() => {
                    handleBinEditOpen(index)
                }}
            ><FontAwesomeIcon icon={faCog}/></Button>
            <Button
                style={{
                    padding: "4px",
                    height: "3em",
                }}
                onClick={() => removeCallback(index)}
            ><FontAwesomeIcon icon={faTrash}/></Button>
        </ButtonGroup>
        <div style={{whiteSpace: "pre"}}>{bin.getText(0)}</div>
        <div/>
        {/*<BinEdit index={editIndex}*/}
        {/*         bin={bin}*/}
        {/*         closedCallback={handleBinEditClose}*/}
        {/*         updateCallback={handleRedraw}*/}
        {/*         saveCallback={updateCallback}*/}
        {/*/>*/}
    </div>
}
