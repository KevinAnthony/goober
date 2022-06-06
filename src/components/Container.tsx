import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faPlus, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Typography} from "@mui/material";
import {ContainerObj} from "../model/container";
import {BackgroundGrid} from "./BackgroundGrid";
import {ColorObj} from "../model/color";
import {BinObj} from "../model/bin";
import {BinNet} from "../net/bin";
import {Bin} from "./Bin";
import {BinEdit} from "./modal/BinEdit";
import {ContentObj} from "../model/content";
import {BoltObj} from "../model/bolt";
import {hex2rgb} from "../util/formatting";
import {red} from "@mui/material/colors";
import {isEmpty} from "../util/utils";
import {SearchBox} from "./modal/Search";
import {ContainerEdit} from "./modal/ContainerEdit";
import {ContainerNet} from "../net/container";
import {Confirmation} from "./dialog/Confirmation";

interface props {
    removeContainer: (container: ContainerObj) => void;
    setPopup: React.Dispatch<React.SetStateAction<JSX.Element>>
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
        setPopup(<div/>);
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
            setPopup(<div/>);
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
        newContent.contentType = "bolt";
        newContent.bolt = BoltObj.Empty();

        const newBin = BinObj.Empty();
        newBin.content.push(newContent);
        newBin.width = 5;
        newBin.height = 5;
        newBin.x = 0;
        newBin.y = 0;
        newBin.color = hex2rgb(red[500]);

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
        setPopup(<ContainerEdit closedCallback={closePopup} container={container}/>)
    }

    function handleSearchOpen() {
        setPopup(
            <SearchBox
                closedCallback={closePopup}
                foundCallback={setContainerByBinCallback}
            />
        );
    }

    let gridGrid = Array(container.width)
        .fill(null)
        .map((_, posX) =>
            Array(container.height)
                .fill(null)
                .map((_, posY) => (
                    <BackgroundGrid
                        key={`grid-${posX}-${posY}`}
                        background={ColorObj.Parse({a: 0})}
                        x={posX}
                        y={posY}
                    />
                ))
        );

    return (
        <>
            <div
                style={{
                    background: `rgb(${container.color.r}, ${container.color.g}, ${container.color.b})`,
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `1fr auto 1fr`,
                        fontSize: "32pt",
                        fontFamily: "Helvetica, sans-serif",
                        color: "white",
                        textAlign: "center",
                        padding: "10px",
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h2"
                        style={{gridColumnStart: "2"}}
                    >
                        {container.label}
                    </Typography>
                    <div
                        style={{
                            gridColumnStart: "3",
                            display: "flex",
                            alignSelf: "center",
                            justifyContent: "right",
                            flexFlow: "row-reverse",
                        }}
                    >
                        <ButtonGroup
                            variant="contained"
                            aria-label="outlined contained button group"
                        >
                            <Button
                                onClick={handleNewBinOpen}
                                style={{
                                    padding: "4px",
                                    width: "4em",
                                    height: "4em",
                                }}
                            >
                                <Typography>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </Typography>
                            </Button>
                            <Button
                                onClick={handleEditContainerOpen}
                                style={{
                                    padding: "4px",
                                    width: "4em",
                                    height: "4em",
                                }}
                            >
                                <Typography>
                                    <FontAwesomeIcon icon={faCog}/>
                                </Typography>
                            </Button>
                            <Button
                                onClick={handleSearchOpen}
                                style={{
                                    padding: "4px",
                                    width: "4em",
                                    height: "4em",
                                }}
                            >
                                <Typography>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </Typography>
                            </Button>
                            <Button
                                style={{
                                    padding: "4px",
                                    width: "4em",
                                    height: "4em",
                                }}
                                onClick={() => setDeleteConfirmationOpen(true)}
                            >
                                <Typography>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Typography>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div
                    className={"grid-container"}
                    style={{
                        width: `${container.width}${container.unit}`,
                        height: `${container.height}${container.unit}`,
                        gridTemplateColumns: `repeat(${container.width}, 1${container.unit})`,
                        gridTemplateRows: `repeat(${container.height}, 1${container.unit})`,
                    }}
                >
                    {gridGrid}
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
