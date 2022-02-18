import React from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";

interface props {
    closedCallback: (accepted: boolean) => void
}

export function Confirmation({closedCallback}:props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDecline = () => {
        closedCallback(false)
        setOpen(false);
    };

    const handleAccept = () => {
        closedCallback(true)
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleDecline}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDecline}>Cancel</Button>
                    <Button onClick={handleAccept} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}
