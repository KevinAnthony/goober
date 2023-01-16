import React from "react";
import { ContainerNet } from "./net/container";
import { ContainerObj } from "./model/container";
import { Container } from "./components/Container";
import { BinObj } from "./model/bin";
import { SideMenu } from "./components/SideMenu";
import { Toaster } from "react-hot-toast";
import styles from "./MainWindow.module.css";
import { BackgroundColor, HighlightPink, HighlightYellow } from "./util/colors";

export default function MainWindow() {
  const [containers, setContainerList] = React.useState<Array<ContainerObj>>(
    []
  );
  const [highlightID, setHighlightID] = React.useState<string>("");
  const [container, setContainer] = React.useState<ContainerObj>(
    ContainerObj.Empty
  );
  const [newPopupObject, setPopupObject] = React.useState<JSX.Element>(<div />);

  React.useEffect(() => {
    const netContainer = new ContainerNet();

    netContainer.getContainerAll().then((containerList: ContainerObj[]) => {
      containerList.sort(compareContainer);
      setContainerList(containerList);
      if (containerList.length > 0) {
        setContainer(containerList[0]);
      }
    });
  }, []);

  function compareContainer(a: ContainerObj, b: ContainerObj) {
    return a.label.toUpperCase() > b.label.toUpperCase() ? 1 : -1;
  }

  function removeContainer(container: ContainerObj) {
    const newContainer = containers.filter((c) => c.id !== container.id);
    newContainer.sort(compareContainer);
    setContainerList(newContainer);
    setContainer(newContainer[0]);
  }

  function setContainerFromBin(bin: BinObj) {
    setHighlightID(bin.id);
    const found = containers.find((c) => c.id === bin.containerID);
    setContainer(found ?? container);
  }

  return (
    <div>
      <div>
        <Toaster
          toastOptions={{
            className: styles.toast,
            success: {
              iconTheme: {
                primary: BackgroundColor,
                secondary: HighlightYellow,
              },
            },
            error: {
              iconTheme: {
                primary: HighlightPink,
                secondary: HighlightYellow,
              },
            },
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `auto 1fr`,
        }}
      >
        <SideMenu
          containers={containers}
          setOptionCallback={setContainer}
          setPopup={setPopupObject}
          currentContainer={container}
        />
        <Container
          removeContainer={removeContainer}
          setPopup={setPopupObject}
          container={container}
          binToHighlightID={highlightID}
          setContainerByBinCallback={setContainerFromBin}
        />
      </div>
      {newPopupObject}
    </div>
  );
}
