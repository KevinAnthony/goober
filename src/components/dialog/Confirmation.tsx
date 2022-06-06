import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography,} from "@mui/material";

interface props {
    closedCallback: (accepted: boolean) => void;
    open: boolean;
    title: string;
    description: string;
}

export function Confirmation({
                                 closedCallback,
                                 open,
                                 title,
                                 description,
                             }: props) {
    const handleDecline = () => {
        closedCallback(false);
    };

    const handleAccept = () => {
        closedCallback(true);
    };

    return (
        <Dialog
            open={open}
            onClose={handleDecline}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography>{title}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>{description}</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDecline}>
                    <Typography>Cancel</Typography>
                </Button>
                <Button onClick={handleAccept} autoFocus>
                    <Typography>OK</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
