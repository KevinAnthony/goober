import React from "react";
import {ToggleButton} from "@mui/material";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface props {
    color: string,
    selected: string
    onChange: (value: string) => void
}

export function ColorButton({color, selected, onChange}: props) {
    return <ToggleButton
        style={{
            width: "50px",
            height: "50px",
            backgroundColor: `${color}`,
        }}
        value={color}
        onChange={(e) => {
            const target = e.target as HTMLInputElement
            onChange(target.value)
        }}>
        {
            selected === color ?
                <FontAwesomeIcon
                    style={{
                        border: "2px",
                        margin: "0px",
                        position: "absolute",
                        height: "80%",
                        width: "80%",
                    }}
                    icon={faCheck}/> : <div/>
        }
    </ToggleButton>
}
