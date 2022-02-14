import getTextForBinContent from '../util/bin_text.js'
import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faCog} from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import {BinEdit} from "./modal/BinEdit";

function Bin(props) {
    const {removeCallback, updateCallback, bin, index} = props
    const [color, setColor] = React.useState(bin.color)
    const [startX, setStartX] = React.useState(bin.column_start_x + 1)
    const [startY, setStartY] = React.useState(bin.column_start_y + 1)
    const [stopX, setStopX] = React.useState(bin.column_start_x + 1 + bin.width)
    const [stopY, setStopY] = React.useState(bin.column_start_y + 1 + bin.height)
    const [editIndex, setEditIndex] = React.useState();

    React.useEffect(() => {
        setEditIndex(-1);
    }, [])

    function handleBinEditClose() {
        setEditIndex(-1);
    }

    function handleBinEditOpen(index) {
        setEditIndex(index);
    }

    function handleRedraw(b) {
        setColor(b.color)
        setStartX((b.column_start_x + 1))
        setStartY((b.column_start_y + 1))
        setStopX((b.column_start_x + 1 + b.width))
        setStopY((b.column_start_y + 1 + b.height))
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
                    handleBinEditOpen(index, bin)
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
        <div style={{whiteSpace: "pre"}}>{getTextForBinContent(bin, 0)}</div>
        <div/>
        <BinEdit index={editIndex}
                 bin={bin}
                 closedCallback={handleBinEditClose}
                 updateCallback={handleRedraw}
                 saveCallback={updateCallback}
        />
    </div>
}

export default Bin
