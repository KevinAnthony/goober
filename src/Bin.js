import getTextForBinContent from './util/bin_text.js'
import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faCog} from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import BinEdit from "./modal/BinEdit";

function Bin(props) {
    const {removeCallback, updateCallback, bin, index} = props
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

    const x = bin.start_x + 1
    const y = bin.start_y + 1
    const stopX = x + bin.width
    const stopY = y + bin.height

    return <div
        className='grid-bin'
        style={{
            gridColumnStart: x,
            gridColumnEnd: stopX,
            gridRowStart: y,
            gridRowEnd: stopY,
            backgroundColor: `rgba(${bin.color.R}, ${bin.color.G}, ${bin.color.B}, 1)`,
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
        <div style={{whiteSpace: "pre"}}>{getTextForBinContent(bin.content)}</div>
        <div/>
        <BinEdit index={editIndex}
                 bin={bin}
                 closedCallback={handleBinEditClose}
                 updateCallback={updateCallback}/>
    </div>
}

export default Bin
