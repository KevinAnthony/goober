import {ToggleButton} from "@mui/material";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

function ColorButton({color, selected, onChange}) {
    return <ToggleButton style={{
        width: "50px",
        height: "50px",
        backgroundColor: `${color}`,
    }}
                         onChange={onChange}
                         value={color}
    >

        {selected === color ?
            <FontAwesomeIcon
                style={{
                    border: "2px",
                    margin: "0px",
                    position: "absolute",
                    height: "80%",
                    width: "80%",
                }}
                icon={faCheck}/> : <div/>}
    </ToggleButton>
}

export default ColorButton
