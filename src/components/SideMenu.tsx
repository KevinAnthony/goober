import React, { Dispatch, SetStateAction } from "react";
import { ContainerObj } from "../model/container";
import { ContainerNew } from "./dialog/ContainerNew";
import styles from "./SideMenu.module.css";

interface props {
  setPopup: React.Dispatch<React.SetStateAction<JSX.Element>>;
  currentContainer: ContainerObj;
  containers: Array<ContainerObj>;
  setOptionCallback: Dispatch<SetStateAction<ContainerObj>>;
}

export function SideMenu({
  setPopup,
  containers,
  currentContainer,
  setOptionCallback,
}: props) {
  function closePopup(container: ContainerObj) {
    if (container.id.length > 0) {
      containers.push(container);
    }
    setPopup(<div />);
  }

  function onContentChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setOptionCallback(
      containers.find((c) => c.id === event.target.value) ?? currentContainer
    );
  }

  return (
    <div className={styles.side_menu}>
      <button
        className={styles.top_button}
        onClick={() => {
          setPopup(<ContainerNew closedCallback={closePopup} />);
        }}
      >
        New
      </button>
      <div className={styles.scrollable}>
        <div className={styles.menu_toggle_button} onChange={onContentChanged}>
          {containers.map((container: ContainerObj) => (
            <div key={container.id} onChange={onContentChanged}>
              <input
                id={container.label}
                checked={container.id === currentContainer.id}
                type={"radio"}
                value={container.id}
                className={styles.menu_button}
                onChange={() => {}}
              />
              <label htmlFor={container.label}>{container.label}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer} />
    </div>
  );
}
