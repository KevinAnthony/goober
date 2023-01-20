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
import { isEmpty } from "../util/utils";
import { SearchBox } from "./dialog/Search";
import { ContainerEdit } from "./dialog/ContainerEdit";
import { ContainerNet } from "../net/container";
import { Confirmation } from "./dialog/Confirmation";
import styles from "./Container.module.css";
import { ContentObj } from "../model/content";
import { hex2rgb } from "../util/formatting";
import { binRed } from "../util/colors";

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

  function removeBin(bin: BinObj) {
    const index = container.bin.map((e) => e.id).indexOf(bin.id);
    container.bin.splice(index, 1);

    setBins([...container.bin]);
  }

  function closePopup() {
    setPopup(<div />);
  }

  function saveBin(bin: BinObj, save: boolean) {
    const index = container.bin.map((e) => e.id).indexOf(bin.id);
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

  function createNewBin(): BinObj {
    let [x, y] = getFirstOpenSpot();
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

  function handleNewBinOpen() {
    container.bin.push(createNewBin());
    setBins([...container.bin]);
  }

  function getFirstOpenSpot() {
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
          {bins.map((bin: BinObj) => (
            <Bin
              highlight={binToHighlightID === bin.id}
              removeCallback={removeBin}
              updateCallback={saveBin}
              key={`bin-${bin.id}`}
              bin={bin}
            />
          ))}
        </div>
      </div>

      <Confirmation
        closedCallback={handleDelete}
        open={deleteConfirmationOpen}
        title={"Delete Container"}
        description={"if you delete this container, it will be unrecoverable"}
      />
    </>
  );
}
