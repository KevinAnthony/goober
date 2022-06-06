import React from "react";
import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faTrash} from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "@mui/material/ButtonGroup";
import {BinObj} from "../model/bin";
import {ColorObj} from "../model/color";
import {BinEdit} from "./modal/BinEdit";
import {Confirmation} from "./dialog/Confirmation";
import {BinNet} from "../net/bin";
import {Typography} from "@mui/material";

interface props {
    bin: BinObj;
    index: number;
    highlight: boolean;
    removeCallback: (index: number) => void;
    updateCallback: (index: number, bin: BinObj, save: boolean) => void;
}

export function Bin({
                        removeCallback,
                        updateCallback,
                        bin,
                        index,
                        highlight,
                    }: props) {
    const binNet = new BinNet();

    const [color, setColor] = React.useState<ColorObj>(bin.color);
    const [startX, setStartX] = React.useState<number>(bin.x + 1);
    const [startY, setStartY] = React.useState<number>(bin.y + 1);
    const [stopX, setStopX] = React.useState<number>(bin.x + 1 + bin.width);
    const [stopY, setStopY] = React.useState<number>(bin.y + 1 + bin.height);
    const [editIndex, setEditIndex] = React.useState<number>(-1);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
        React.useState<boolean>(false);
    const [isHighlighted, setIsHighlighted] = React.useState<boolean>(
        () => highlight
    );

    if (isHighlighted) {
        setTimeout(() => setIsHighlighted(false), 2000);
    }

    function handleBinEditClose() {
        setEditIndex(-1);
    }

    function handleBinEditOpen(index: number) {
        setEditIndex(index);
    }

    function handleRedraw(b: BinObj) {
        setColor(b.color);
        setStartX(b.x + 1);
        setStartY(b.y + 1);
        setStopX(b.x + 1 + b.width);
        setStopY(b.y + 1 + b.height);
    }

    function handleDelete(accepted: boolean) {
        if (accepted) {
            binNet.deleteBin(bin).then(() => {
                removeCallback(index);
            });
        }
        setDeleteConfirmationOpen(false);
    }

    return (
        <div
            className="grid-bin"
            style={{
                gridColumnStart: startX,
                gridColumnEnd: stopX,
                gridRowStart: startY,
                gridRowEnd: stopY,
                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: isHighlighted ? "0.4rem solid #0cc" : "",
            }}
        >
            <ButtonGroup
                fullWidth={true}
                variant="contained"
                aria-label="outlined contained button group"
            >
                <Button
                    style={{
                        padding: "4px",
                        height: "3em",
                    }}
                    onClick={() => {
                        handleBinEditOpen(index);
                    }}
                >
                    <Typography>
                        <FontAwesomeIcon icon={faCog}/>
                    </Typography>
                </Button>
                <Button
                    style={{
                        padding: "4px",
                        height: "3em",
                    }}
                    onClick={() => setDeleteConfirmationOpen(true)}
                >
                    <Typography>
                        <FontAwesomeIcon icon={faTrash}/>
                    </Typography>
                </Button>
            </ButtonGroup>
            <Typography variant="bin_content">
                {bin.getText(0)}
            </Typography>
            <div/>
            <BinEdit
                binIndex={editIndex}
                bin={bin}
                closedCallback={handleBinEditClose}
                updateCallback={handleRedraw}
                saveCallback={updateCallback}
                removeCallback={removeCallback}
                title={"Edit Bin"}
            />
            <Confirmation
                closedCallback={handleDelete}
                open={deleteConfirmationOpen}
                title={"Delete Bin"}
                description={"if you delete this bin, it will be unrecoverable"}
            />
        </div>
    );
}
