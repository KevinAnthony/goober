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
  const [contentIndex, setContextIndex] = React.useState<number>(0);

  const [editBin, setEditBin] = React.useState<JSX.Element>(() => {
    if (bin.id?.length > 0) {
      return <div />;
    }

    return getEditPopover();
  });

  React.useEffect(() => {
    if (bin.content[contentIndex].id?.length > 0) {
      return;
    }

    handleBinEditOpen();
  }, [contentIndex]);

  const [deleteConfirmation, setDeleteConfirmation] =
    React.useState<JSX.Element>(<div />);
  const [isHighlighted, setIsHighlighted] = React.useState<boolean>(
    () => highlight
  );

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
    if (contentIndex >= b.content.length) {
      setContextIndex(b.content.length - 1);
    }

    setColor(b.color);
    setStartX(b.x + 1);
    setStartY(b.y + 1);
    setStopX(b.x + 1 + b.width);
    setStopY(b.y + 1 + b.height);

    updateCallback(b, false);
  }

  function handleDelete(accepted: boolean) {
    if (accepted) {
      binNet.deleteBin(bin).then(() => {
        removeCallback(bin);
      });
    }
    setDeleteConfirmation(<div />);
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

  function getDeletePopover(): JSX.Element {
    let title = "Delete Bin";
    let description = "If you delete this bin, it will be unrecoverable";
    if (bin.content.length > 1) {
      title = `Delete ${bin.content[contentIndex].contentType}`;
      description = `If you delete this ${bin.content[contentIndex].contentType}, it will be unrecoverable`;
    }
    return (
      <Confirmation
        closedCallback={handleDelete}
        open={true}
        title={title}
        description={description}
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
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className={styles.top_button}
            disabled={contentIndex === bin.content.length - 1}
            onClick={() => {
              setContextIndex(contentIndex + 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <button
          className={styles.top_button}
          onClick={() => setDeleteConfirmation(getDeletePopover)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className={styles.bin_table}>{bin.GetCotentText(contentIndex)}</div>
      <div />
      {editBin}
      <div
        className={styles.bin_color_viewer}
        style={{
          background: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
        }}
      />
      {deleteConfirmation}
    </div>
  );
}
