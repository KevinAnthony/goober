import React from "react";
import { ContainerObj } from "../model/container";
import { BinObj } from "../model/bin";
import { BinNet } from "../net/bin";
import { Bin } from "./Bin";
import { isEmpty } from "../util/utils";
import styles from "./Container.module.css";

interface props {
  removeContainer: (container: ContainerObj) => void;
  container: ContainerObj;
  binToHighlightID: string;
  style?: React.CSSProperties;
}

export function Container({ container, binToHighlightID, style }: props) {
  const [bins, setBins] = React.useState(container.bin);
  const binNet = new BinNet();

  React.useEffect(() => {
    setBins(container.bin);
  }, [container]);

  function removeBin(bin: BinObj) {
    const index = container.bin.map((e) => e.id).indexOf(bin.id);
    container.bin.splice(index, 1);

    setBins([...container.bin]);
  }

  function saveBin(bin: BinObj, save: boolean) {
    const index = container.bin.map((e) => e.id).indexOf(bin.id);
    if (!save) {
      container.bin[index] = bin;
      setBins([...container.bin]);

      return;
    }

    if (isEmpty(bin.id)) {
      bin.containerID = container.id;

      binNet.createBin(bin).then((b: BinObj) => {
        container.bin.push(b);
        setBins([...container.bin]);
      });

      return;
    }

    binNet.putBin(bin).then((b: BinObj) => {
      container.bin.splice(index, 1, b);
      setBins([...container.bin]);
    });
  }

  return (
    <div style={{ ...style }}>
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
  );
}
