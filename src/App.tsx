import React from "react";
import "./App.css";
import "./containers.css";
import { SideMenu } from "./components/SideMenu";
import { ContainerNet } from "./net/container";
import { ContainerObj } from "./model/container";
import { Container } from "./components/Container";

function App() {
  const [containers, setContainerList] = React.useState<Array<ContainerObj>>(
    []
  );
  const [container, setContainer] = React.useState<ContainerObj>(
    ContainerObj.Empty
  );

  React.useEffect(() => {
    const netContainer = new ContainerNet();

    netContainer.getContainerAll().then((containerList) => {
      setContainerList(containerList);
      if (containerList.length > 0) {
        setContainer(containerList[0]);
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `auto 1fr`,
      }}
    >
      <div>
        <SideMenu containers={containers} setOptionCallback={setContainer} />
      </div>
      <div
        style={{
          gridColumnStart: 2,
          width: `${container.width}${container.unit}`,
          fontSize: "32pt",
          fontFamily: "FontAwesome, sans-serif",
          color: "white",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Container container={container} />
        </div>
      </div>
    </div>
  );
}

export default App;