import React, { Dispatch, SetStateAction } from "react";
import { ContainerObj } from "../model/container";
import { ContainerNew } from "./modal/ContainerNew";
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
    console.log(event);

    setOptionCallback(
      containers.find((c) => c.id === event.target.value) ?? currentContainer
    );
  }

  console.log(currentContainer);

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
      <div style={{ position: "relative", height: "100vh" }}>
        <div className={styles.menu_toggle_button} onChange={onContentChanged}>
          {containers.map((container: ContainerObj) => (
            <div key={container.id} onChange={onContentChanged}>
              <input
                id={container.label}
                checked={container.id === currentContainer.id}
                type={"radio"}
                value={container.id}
                className={styles.menu_button}
              />
              <label htmlFor={container.label}>{container.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
