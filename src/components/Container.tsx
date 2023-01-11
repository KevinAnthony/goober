import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ContainerObj } from "../model/container";
import { BinObj } from "../model/bin";
import { BinNet } from "../net/bin";
import { Bin } from "./Bin";
import { BinEdit } from "./drawer/BinEdit";
import { ContentObj } from "../model/content";
import { hex2rgb } from "../util/formatting";
import { red } from "@mui/material/colors";
import { isEmpty } from "../util/utils";
import { SearchBox } from "./dialog/Search";
import { ContainerEdit } from "./dialog/ContainerEdit";
import { ContainerNet } from "../net/container";
import { Confirmation } from "./dialog/Confirmation";
import styles from "./Container.module.css";

interface props {
  removeContainer: (container: ContainerObj) => void;
  setPopup: React.Dispatch<React.SetStateAction<JSX.Element>>;
  container: ContainerObj;
  setContainerByBinCallback: (bin: BinObj) => void;
  binToHighlightID: string;
}

export function Container({
  removeContainer,
  setPopup,
  container,
  setContainerByBinCallback,
  binToHighlightID,
}: props) {
  const [bins, setBins] = React.useState(() => container.bin);
  const binNet = new BinNet();
  const containerNet = new ContainerNet();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState<boolean>(false);

  function handleDelete(accepted: boolean) {
    if (accepted) {
      containerNet.deleteContainer(container).then(() => {
        removeContainer(container);
      });
    }
    setDeleteConfirmationOpen(false);
  }

  React.useEffect(() => {
    setBins(container.bin);
  }, [container]);

  function removeBin(index: number) {
    container.bin.splice(index, 1);

    setBins([...container.bin]);
  }

  function drawNewBin(bin: BinObj) {
    setNewBin(bin);
    setNewBinIndex(newBinIndex);
    setRedrawBin(true);

    return;
  }

  function closePopup() {
    setPopup(<div />);
  }

  function saveBin(index: number, bin: BinObj, save: boolean) {
    if (!save) {
      container.bin.splice(index, 1, bin);
      setBins([...container.bin]);

      return;
    }

    if (isEmpty(bin.id)) {
      bin.containerID = container.id;

      binNet.createBin(bin).then((b: BinObj) => {
        container.bin.push(b);
        setBins([...container.bin]);
      });
    } else {
      binNet.putBin(bin).then((b: BinObj) => {
        container.bin.splice(index, 1, b);
        setBins([...container.bin]);
      });
    }
  }

  const [newBinIndex, setNewBinIndex] = React.useState<number>(-1);
  const [newBin, setNewBin] = React.useState<BinObj>(createNewBin());
  const [redrawBin, setRedrawBin] = React.useState<boolean>(false);

  React.useEffect(() => {
    setRedrawBin(false);

    if (newBinIndex < 0) {
      setPopup(<div />);
    } else {
      setPopup(
        <Bin
          highlight={false}
          bin={newBin}
          index={newBinIndex}
          removeCallback={removeBin}
          updateCallback={saveBin}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newBinIndex, newBin, redrawBin]);

  function createNewBin(): BinObj {
    const newContent = ContentObj.Empty();
    newContent.contentType = "empty";

    const newBin = BinObj.Empty();
    newBin.content.push(newContent);
    //TODO lets try and figure out where this goes in reality
    newBin.width = 5;
    newBin.height = 5;
    newBin.x = 0;
    newBin.y = 0;
    newBin.color = hex2rgb(red[500]);
    newBin.unit = "cm";

    return newBin;
  }

  function handleNewBinClosed() {
    setNewBinIndex(-1);
    setNewBin(createNewBin());
  }

  function handleNewBinOpen() {
    setNewBinIndex(container.bin.length + 1);
  }

  function handleEditContainerOpen() {
    setPopup(
      <ContainerEdit closedCallback={closePopup} container={container} />
    );
  }

  function handleSearchOpen() {
    setPopup(
      <SearchBox
        closedCallback={closePopup}
        foundCallback={setContainerByBinCallback}
      />
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_title}>
          <div className={styles.container_label}>
            {container.label}
            <div
              className={styles.label_slash}
              style={{
                background: `rgb(${container.color.r}, ${container.color.g}, ${container.color.b})`,
              }}
            />
          </div>
          <div className={styles.container_menu}>
            <button
              className={styles.container_menu_button}
              onClick={handleNewBinOpen}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              className={styles.container_menu_button}
              onClick={handleEditContainerOpen}
            >
              <FontAwesomeIcon icon={faCog} />
            </button>
            <button
              className={styles.container_menu_button}
              onClick={handleSearchOpen}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button
              className={styles.container_menu_button}
              onClick={() => setDeleteConfirmationOpen(true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        <div
          className={styles.container_inner}
          style={{
            aspectRatio: `${container.width}/${container.height}`,
            gridTemplateColumns: `repeat(${container.width}, 1fr)`,
            gridTemplateRows: `repeat(${container.height}, 1fr)`,
          }}
        >
          {bins.map((bin: BinObj, index: number) => (
            <Bin
              highlight={binToHighlightID === bin.id}
              removeCallback={removeBin}
              updateCallback={saveBin}
              key={`bin-${bin.id}`}
              index={index}
              bin={bin}
            />
          ))}
        </div>
      </div>
      <BinEdit
        bin={newBin}
        title={"New Bin"}
        binIndex={newBinIndex}
        closedCallback={handleNewBinClosed}
        updateCallback={drawNewBin}
        removeCallback={removeBin}
        saveCallback={saveBin}
      />
      <Confirmation
        closedCallback={handleDelete}
        open={deleteConfirmationOpen}
        title={"Delete Container"}
        description={"if you delete this container, it will be unrecoverable"}
      />
    </>
  );
}
