import React, { Dispatch, SetStateAction } from "react";
import { ContainerObj } from "../model/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./TopMenu.module.css";
import { BinObj } from "../model/bin";
import { ContentObj } from "../model/content";
import { hex2rgb } from "../util/formatting";
import { binRed } from "../util/colors";
import { ContainerEdit } from "./dialog/ContainerEdit";
import { SearchBox } from "./dialog/Search";

interface props {
  container: ContainerObj;
  containers: Array<ContainerObj>;
  setContainerByBinCallback: (bin: BinObj) => void;
  setPopup: React.Dispatch<React.SetStateAction<JSX.Element>>;
  style?: React.CSSProperties;
  setDeleteConfirmationOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function TopMenu({
  container,
  style,
  setPopup,
  setContainerByBinCallback,
  setDeleteConfirmationOpen,
}: props) {
  function handleNewBinOpen() {
    const bin = createNewBin(container);
    container.bin.push(bin);
    setContainerByBinCallback(bin);
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

  function closePopup() {
    setPopup(<div />);
  }

  return (
    <div style={{ ...style }}>
      <div className={styles.title}>
        <div className={styles.label}>
          {container.label}
          <div
            className={styles.slash}
            style={{
              background: `rgb(${container.color.r}, ${container.color.g}, ${container.color.b})`,
            }}
          />
        </div>
        <div className={styles.menu}>
          <button onClick={handleNewBinOpen}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={handleEditContainerOpen}>
            <FontAwesomeIcon icon={faCog} />
          </button>
          <button onClick={handleSearchOpen}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button onClick={() => setDeleteConfirmationOpen(true)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

function createNewBin(container: ContainerObj): BinObj {
  let [x, y] = getFirstOpenSpot(container);
  const newContent = ContentObj.Empty();
  newContent.contentType = "empty";

  const newBin = BinObj.Empty();
  newBin.content.push(newContent);

  newBin.width = 5;
  newBin.height = 5;
  newBin.x = x;
  newBin.y = y;
  newBin.color = hex2rgb(binRed);
  newBin.unit = "cm";

  return newBin;
}

function getFirstOpenSpot(container: ContainerObj) {
  for (let y = 0; y < container.height; y++) {
    for (let x = 0; x < container.width; x++) {
      if (
        container.bin.find((bin) => isPointWithinBin(x, y, bin)) === undefined
      ) {
        return [x, y];
      }
    }
  }

  return [0, 0];
}

function isPointWithinBin(x: number, y: number, bin: BinObj) {
  if (x < bin.x || x > bin.x + bin.width - 1) {
    return false;
  }

  if (y < bin.y || y > bin.y + bin.height - 1) {
    return false;
  }

  return true;
}
