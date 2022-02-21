import React from "react";
import {TextField} from "@mui/material";

interface outlineBoxProps {
    children: React.ReactNode
    label: string
    style: React.CSSProperties
}

const InputComponent = ({...other}) => <div {...other} />;

export const OutlinedBox = ({children, label, style}: outlineBoxProps) => {
    return (
        <TextField
            variant="outlined"
            label={label}
            multiline
            InputLabelProps={{shrink: true}}
            style={style}
            InputProps={{
                inputComponent: InputComponent
            }}
            inputProps={{children: children}}
        >
        </TextField>
    );
};
