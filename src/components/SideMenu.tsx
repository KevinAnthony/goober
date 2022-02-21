import React, {Dispatch, SetStateAction} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {ContainerObj} from "../model/container";

interface props {
    containers: Array<ContainerObj>,
    setOptionCallback: Dispatch<SetStateAction<ContainerObj>>,
}

export function SideMenu({containers, setOptionCallback}: props) {
    return <Box
        sx={{
            display: 'flex',
            '& > *': {
                m: 1,
            },
            padding: "10px 25px"
        }}>
        <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained">
            <Button
                style={{
                    width: "16em",
                    height: "4em"
                }}>New</Button>
            {containers.map((container: ContainerObj) => (
                <Button
                    style={{
                        width: "16em",
                        height: "4em"
                    }}
                    key={`side-button-${container.id}`}
                    onClick={() => {
                        setOptionCallback(container)
                    }}
                >{container.label}</Button>
            ))
            }
        </ButtonGroup>
    </Box>
}
