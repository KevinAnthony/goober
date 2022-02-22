import React from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "@mui/material/ButtonGroup";
import { BinObj } from "../model/bin";
import { ColorObj } from "../model/color";
import { BinEdit } from "./modal/BinEdit";
import { Confirmation } from "./dialog/Confirmation";
import { BinNet } from "../net/bin";

interface props {
  bin: BinObj;
  index: number;
  removeCallback: (index: number) => void;
  updateCallback: (index: number, bin: BinObj, save: boolean) => void;
}

// @ts-ignore
export function Bin({ removeCallback, updateCallback, bin, index }: props) {
  const binNet = new BinNet();

  const [color, setColor] = React.useState<ColorObj>(bin.color);
  const [startX, setStartX] = React.useState<number>(bin.x + 1);
  const [startY, setStartY] = React.useState<number>(bin.y + 1);
  const [stopX, setStopX] = React.useState<number>(bin.x + 1 + bin.width);
  const [stopY, setStopY] = React.useState<number>(bin.y + 1 + bin.height);
  const [editIndex, setEditIndex] = React.useState<number>(-1);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState<boolean>(false);

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
          <FontAwesomeIcon icon={faCog} />
        </Button>
        <Button
          style={{
            padding: "4px",
            height: "3em",
          }}
          onClick={() => setDeleteConfirmationOpen(true)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </ButtonGroup>
      <div style={{ whiteSpace: "pre" }}>{bin.getText(0)}</div>
      <div />
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