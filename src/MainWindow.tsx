import React from "react";
import {ContainerNet} from "./net/container";
import {ContainerObj} from "./model/container";
import {Container} from "./components/Container";
import {BinObj} from "./model/bin";
import {SideMenu} from "./components/SideMenu";

export default function MainWindow() {
    const [containers, setContainerList] = React.useState<Array<ContainerObj>>([]);
    const [highlightID, setHighlightID] = React.useState<string>("");
    const [container, setContainer] = React.useState<ContainerObj>(ContainerObj.Empty);
    const [newPopupObject, setPopupObject] = React.useState<JSX.Element>(<div/>);

    React.useEffect(() => {
        const netContainer = new ContainerNet();

        netContainer.getContainerAll().then((containerList:ContainerObj[]) => {
            setContainerList(containerList);
            if (containerList.length > 0) {
                setContainer(containerList[0]);
            }
        });
    }, []);

    function removeContainer(container:ContainerObj) {
        const newContainer = containers.filter(c => c.id !== container.id);
        setContainerList(newContainer);
        setContainer(newContainer[0]);
    }

    function setContainerFromBin(bin: BinObj) {
        setHighlightID(bin.id);
        const found = containers.find((c) => c.id === bin.containerID);
        setContainer(found ?? container);
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `auto 1fr`,
            }}
        >
            <div>
                <SideMenu containers={containers} setOptionCallback={setContainer} setPopup={setPopupObject}/>
                {newPopupObject}
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
                    <Container
                        removeContainer={removeContainer}
                        setPopup={setPopupObject}
                        container={container}
                        binToHighlightID={highlightID}
                        setContainerByBinCallback={setContainerFromBin}
                    />
                </div>
            </div>
        </div>
    );
}
