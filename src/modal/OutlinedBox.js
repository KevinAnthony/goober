import React from "react";
import {TextField} from "@mui/material";


const InputComponent = ({inputRef, ...other}) => <div {...other} />;

const OutlinedBox = ({children, label, style}) => {
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
