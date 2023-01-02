import React, { Dispatch, SetStateAction } from "react";
import { ContainerObj } from "../model/container";
import { ContainerNew } from "./modal/ContainerNew";
import styles from "./SideMenu.module.css";

interface props {
  setPopup: React.Dispatch<React.SetStateAction<JSX.Element>>;
  containers: Array<ContainerObj>;
  setOptionCallback: Dispatch<SetStateAction<ContainerObj>>;
}

export function SideMenu({ setPopup, containers, setOptionCallback }: props) {
  function closePopup(container: ContainerObj) {
    if (container.id.length > 0) {
      containers.push(container);
    }
    setPopup(<div />);
  }

  return (
    <div className={styles.side_menu}>
      <button
        className={styles.menu_button}
        onClick={() => {
          setPopup(<ContainerNew closedCallback={closePopup} />);
        }}
      >
        New
      </button>
      <div className={styles.menu_scroll}>
        {containers.map((container: ContainerObj) => (
          <button
            className={styles.menu_button}
            key={`side-button-${container.id}`}
            onClick={() => {
              setOptionCallback(container);
            }}
          >
            {container.label}
          </button>
        ))}
      </div>
    </div>
  );
}
