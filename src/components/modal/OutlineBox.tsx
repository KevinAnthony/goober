import React from "react";
import {TextField} from "@mui/material";
import {InputBaseComponentProps} from "@mui/material/InputBase/InputBase";

interface inputComponentProps {
    inputRef: InputBaseComponentProps
}

const InputComponent = ({inputRef, ...other}: inputComponentProps) => <div {...other} />;

interface outlineBoxProps{
    children: React.ReactNode
    label: string
    style: React.CSSProperties
}

const OutlinedBox = ({children, label, style}: outlineBoxProps) => {
    return (
        <TextField
            variant="outlined"
            label={label}
            multiline
            InputLabelProps={{shrink: true}}
            InputProps={{
                inputComponent: InputComponent
            }}
            style={style}
            inputProps={{children: children}}
        />
    );
};
export default OutlinedBox;
