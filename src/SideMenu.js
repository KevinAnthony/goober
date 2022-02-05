import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

function SideMenu({containers, setOptionCallback}) {
    const [state, setState] = React.useState("")
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
            {containers.map((container) => (
                <Button
                    style={{
                        width: "16em",
                        height: "4em"
                    }}
                    key={container.box}
                    onClick={() => {
                        setState(container.box)
                        setOptionCallback(container)
                    }}
                >{container.box}</Button>
            ))
            }
        </ButtonGroup>
    </Box>
}


export default SideMenu
