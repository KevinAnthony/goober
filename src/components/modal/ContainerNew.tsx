import React from "react";
import {Button, ButtonGroup, Dialog, DialogTitle, TextField,} from "@mui/material";

import {ContainerObj} from "../../model/container";
import {ContainerNet} from "../../net/container";

interface props {
    closedCallback: (container: ContainerObj) => void;
}

export function ContainerNew({closedCallback}: props) {
    const net = new ContainerNet();
    let container = ContainerObj.Empty();
    container.unit = "cm"
    container.height = 25
    container.width = 33
    container.color.r = 6
    container.color.g = 74
    container.color.b = 108
    container.color.a = 255

    return (
        <div
            style={{
                position: "absolute",
                backgroundColor: "rgb(77,77,77,1)",
            }}
        >
            <Dialog
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={true}
                onClose={closedCallback}
            >
                <DialogTitle>Edit Container</DialogTitle>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        id="container-name"
                        label="Name" variant="outlined"
                        defaultValue={container.label}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            container.label = event.target.value;
                        }}
                    />
                    <ButtonGroup
                        aria-label="contained button group"
                        variant="contained"
                        style={{
                            margin: "1em",
                        }}
                    >
                        <Button
                            style={{
                                width: "16em",
                                height: "4em",
                            }}
                            onClick={() => {
                                net.createContainer(container).then((container: ContainerObj) => {
                                    closedCallback(container);
                                })
                            }}
                        >
                            Create
                        </Button>
                        <Button
                            style={{
                                width: "16em",
                                height: "4em",
                            }}
                            onClick={() => {
                                closedCallback(ContainerObj.Empty());
                            }}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </Dialog>
        </div>
    );
}
