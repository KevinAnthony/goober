import React from "react";
import styles from "./Bin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTrash } from "@fortawesome/free-solid-svg-icons";
import { BinObj } from "../model/bin";
import { ColorObj } from "../model/color";
import { BinEdit } from "./drawer/BinEdit";
import { Confirmation } from "./dialog/Confirmation";
import { BinNet } from "../net/bin";

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
      className={styles.bin}
      style={{
        gridColumnStart: startX,
        gridColumnEnd: stopX,
        gridRowStart: startY,
        gridRowEnd: stopY,
        border: isHighlighted ? "0.4rem solid #0cc" : "",
      }}
    >
      <div className={styles.top_button_bar}>
        <button
          className={styles.top_button}
          onClick={() => {
            handleBinEditOpen(index);
          }}
        >
          <FontAwesomeIcon icon={faCog} />
        </button>
        <button
          className={styles.top_button}
          onClick={() => setDeleteConfirmationOpen(true)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className={styles.bin_table}>{bin.GetEdit(0)}</div>
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
      <div
        className={styles.bin_color_viewer}
        style={{
          background: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
        }}
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
