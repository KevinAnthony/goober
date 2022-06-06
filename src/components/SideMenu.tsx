import React, {Dispatch, SetStateAction} from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import {ContainerObj} from "../model/container";
import {ContainerNew} from "./modal/ContainerNew";
import {Typography} from "@mui/material";

interface props {
    setPopup: React.Dispatch<React.SetStateAction<JSX.Element>>
    containers: Array<ContainerObj>;
    setOptionCallback: Dispatch<SetStateAction<ContainerObj>>;
}

export function SideMenu({setPopup, containers, setOptionCallback}: props) {
    function closePopup(container: ContainerObj) {
        if (container.id.length > 0) {
            containers.push(container)
        }
        setPopup(<div/>);
    }

    return (
        <Box
            sx={{
                display: "flex",
                "& > *": {
                    m: 1,
                },
                padding: "10px 25px",
            }}
        >
            <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
            >
                <Button
                    style={{
                        width: "16em",
                        height: "4em",
                    }}
                    onClick={() => {
                        setPopup(<ContainerNew closedCallback={closePopup}/>)
                    }}
                >
                    <Typography>New</Typography>
                </Button>
                {containers.map((container: ContainerObj) => (
                    <Button
                        style={{
                            width: "16em",
                            height: "4em",
                        }}
                        key={`side-button-${container.id}`}
                        onClick={() => {
                            setOptionCallback(container);
                        }}
                    >
                        <Typography>{container.label}</Typography>
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
}
