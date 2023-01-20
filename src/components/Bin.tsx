import React from "react";
import styles from "./Bin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCog,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { BinObj } from "../model/bin";
import { ColorObj } from "../model/color";
import { BinEdit } from "./drawer/BinEdit";
import { Confirmation } from "./dialog/Confirmation";
import { BinNet } from "../net/bin";
import { ContentObj } from "../model/content";

interface props {
  bin: BinObj;
  highlight: boolean;
  removeCallback: (bin: BinObj) => void;
  updateCallback: (bin: BinObj, save: boolean) => void;
}

export function Bin({ removeCallback, updateCallback, bin, highlight }: props) {
  const binNet = new BinNet();

  const [color, setColor] = React.useState<ColorObj>(bin.color);
  const [startX, setStartX] = React.useState<number>(bin.x + 1);
  const [startY, setStartY] = React.useState<number>(bin.y + 1);
  const [stopX, setStopX] = React.useState<number>(bin.x + 1 + bin.width);
  const [stopY, setStopY] = React.useState<number>(bin.y + 1 + bin.height);

  const [editBin, setEditBin] = React.useState<JSX.Element>(() => {
    if (bin.id?.length > 0) {
      return <div />;
    }

    return getEditPopover();
  });
  const [contentIndex, setContextIndex] = React.useState<number>(() => 0);
  const [contentText, setContentText] = React.useState<JSX.Element>(() =>
    bin.GetContentText(contentIndex)
  );
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState<boolean>(false);
  const [isHighlighted, setIsHighlighted] = React.useState<boolean>(
    () => highlight
  );

  React.useEffect(() => {
    setContentText(bin.GetContentText(contentIndex));
  }, [contentIndex]);

  if (isHighlighted) {
    setTimeout(() => setIsHighlighted(false), 2000);
  }

  function handleBinEditClose() {
    setEditBin(<div />);
  }

  function handleBinEditOpen() {
    setEditBin(getEditPopover());
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
        removeCallback(bin);
      });
    }
    setDeleteConfirmationOpen(false);
  }

  function getEditPopover(): JSX.Element {
    return (
      <BinEdit
        bin={bin}
        contentIndex={contentIndex}
        closedCallback={handleBinEditClose}
        updateCallback={handleRedraw}
        saveCallback={updateCallback}
        removeCallback={removeCallback}
        title={bin.id?.length > 0 ? "Edit Bin" : "New Bin"}
      />
    );
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
        <div>
          <button
            className={styles.top_button}
            disabled={contentIndex === 0}
            onClick={() => {
              handleBinEditOpen();
              setContextIndex(contentIndex - 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={styles.top_button}
            onClick={() => {
              handleBinEditOpen();
            }}
          >
            <FontAwesomeIcon icon={faCog} />
          </button>
          <button
            className={styles.top_button}
            onClick={() => {
              bin.content.push(ContentObj.NewContent(bin.id));
              setContextIndex(bin.content.length - 1);
              handleBinEditOpen();
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            disabled={contentIndex === bin.content.length - 1}
            className={styles.top_button}
            onClick={() => {
              setContextIndex(contentIndex + 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <button
          className={styles.top_button}
          onClick={() => setDeleteConfirmationOpen(true)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className={styles.bin_table}>{contentText}</div>
      <div />
      {editBin}
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
