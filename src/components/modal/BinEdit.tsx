import React, { MouseEvent } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  amber,
  blueGrey,
  green,
  indigo,
  orange,
  red,
} from "@mui/material/colors";
import { hex2rgb, rgb2hex } from "../../util/formatting";
import { BinObj } from "../../model/bin";
import { OutlinedBox } from "./OutlineBox";
import { ColorButton } from "./ColorButton";
import { BoltObj } from "../../model/bolt";
import { WasherObj } from "../../model/washer";
import { ScrewObj } from "../../model/screw";
import { BinNet } from "../../net/bin";
import { WasherEdit } from "./subedit/WasherEdit";
import { BoltEdit } from "./subedit/BoltEdit";
import { ScrewEdit } from "./subedit/ScrewEdit";

interface props {
  bin: BinObj;
  binIndex: number;
  updateCallback: (bin: BinObj) => void;
  closedCallback: () => void;
  saveCallback: (index: number, bin: BinObj, save: boolean) => void;
  removeCallback: (index: number) => void;
  title: string;
}

export function BinEdit({
  binIndex,
  bin,
  closedCallback,
  updateCallback,
  saveCallback,
  title,
  removeCallback,
}: props) {
  const net = new BinNet();
  const [innerContainer, setContainer] = React.useState<JSX.Element>();
  const [binState, setBin] = React.useState<BinObj>(bin);
  const [contentIndex] = React.useState<number>(0);

  React.useEffect(() => {
    if (binIndex >= 0) {
      setContainer(getFieldsForContent(binState, 0, updateCallback));
    }

    setBin(bin);
  }, [bin, binIndex, binState, updateCallback]);

  const [binRed, binBlue, binGreen, binYellow, binOrange, binGrey] = [
    red[500],
    indigo[500],
    green[500],
    amber[500],
    orange[500],
    blueGrey[500],
  ];

  const [selectedColor, setSelectedColor] = React.useState<string>(
    rgb2hex(bin.color)
  );
  const [selectedUnit, setSelectedUnit] = React.useState<string>(bin.unit);

  function handleColorChange(newColor: string) {
    setSelectedColor(newColor);
    binState.color = hex2rgb(newColor);
    setBin(binState);
    updateCallback(binState);
  }

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "rgb(77,77,77,1)",
      }}
    >
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={binIndex >= 0}
        onClose={closedCallback}
      >
        <DialogTitle>{title}</DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <ToggleButtonGroup
              color="primary"
              value={binState.content[contentIndex].contentType}
              exclusive
              onChange={(
                _event: React.MouseEvent<HTMLElement>,
                newType: string
              ) => {
                binState.content[contentIndex].contentType = newType;
                binState.content[contentIndex].bolt = BoltObj.Empty();
                binState.content[contentIndex].screw = ScrewObj.Empty();
                binState.content[contentIndex].washer = WasherObj.Empty();

                setBin(binState);
                setContainer(getFieldsForContent(binState, 0, updateCallback));
              }}
            >
              <ToggleButton value="empty">Empty</ToggleButton>
              <ToggleButton value="bolt">Bolt</ToggleButton>
              <ToggleButton value="screw">Screw</ToggleButton>
              <ToggleButton value="washer">Washer</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Box component="form">
            <div
              style={{
                margin: "1em",
                display: "flex",
                gap: "10px",
              }}
            >
              <TextField
                id="loc-x"
                variant="outlined"
                label="Location X"
                type="number"
                defaultValue={binState.x}
                onClick={(e: MouseEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  binState.x = parseInt(target.value);
                  updateCallback(binState);
                }}
                style={{ width: "80px" }}
              />
              <TextField
                id="loc-y"
                variant="outlined"
                label="Location Y"
                type="number"
                defaultValue={binState.y}
                onClick={(e: MouseEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  binState.y = parseInt(target.value);
                  updateCallback(binState);
                }}
                style={{ width: "80px" }}
              />
              <TextField
                id="width"
                variant="outlined"
                label="Width"
                type="number"
                defaultValue={binState.width}
                onClick={(e: MouseEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  binState.width = parseInt(target.value);
                  updateCallback(binState);
                }}
                style={{ width: "80px" }}
              />
              <TextField
                id="height"
                variant="outlined"
                label="Height"
                type="number"
                defaultValue={binState.height}
                onClick={(e: MouseEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  binState.height = parseInt(target.value);
                  updateCallback(binState);
                }}
                style={{ width: "80px" }}
              />
            </div>
          </Box>
          <OutlinedBox
            label="Color Picker"
            style={{
              margin: "20px",
            }}
          >
            <ToggleButtonGroup value={selectedColor} exclusive>
              <div
                style={{
                  margin: "1em",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <ColorButton
                  onChange={handleColorChange}
                  color={binRed}
                  selected={selectedColor}
                />
                <ColorButton
                  onChange={handleColorChange}
                  color={binBlue}
                  selected={selectedColor}
                />
                <ColorButton
                  onChange={handleColorChange}
                  color={binGreen}
                  selected={selectedColor}
                />
                <ColorButton
                  onChange={handleColorChange}
                  color={binYellow}
                  selected={selectedColor}
                />
                <ColorButton
                  onChange={handleColorChange}
                  color={binOrange}
                  selected={selectedColor}
                />
                <ColorButton
                  onChange={handleColorChange}
                  color={binGrey}
                  selected={selectedColor}
                />
              </div>
            </ToggleButtonGroup>
          </OutlinedBox>
          <ToggleButtonGroup
            color="primary"
            value={selectedUnit}
            exclusive
            onChange={(_e, newUnit: string) => {
              setSelectedUnit(newUnit);
              binState.unit = newUnit;
            }}
          >
            <ToggleButton value="in">Imperial</ToggleButton>
            <ToggleButton value="mm">Metric</ToggleButton>
            <ToggleButton value="an">AN</ToggleButton>
          </ToggleButtonGroup>
          {innerContainer}
          <ButtonGroup
            aria-label="contained button group"
            variant="contained"
            style={{
              margin: "1em",
            }}
          >
            <Button
              style={{
                width: "16em",
                height: "4em",
              }}
              onClick={() => {
                updateCallback(binState);
                saveCallback(binIndex, binState, true);
                closedCallback();
              }}
            >
              Save
            </Button>
            <Button
              style={{
                width: "16em",
                height: "4em",
              }}
              onClick={() => {
                if (!binState.id) {
                  removeCallback(binIndex);
                  closedCallback();

                  return;
                }
                net.getBin(binState).then((b) => {
                  updateCallback(b);
                  closedCallback();
                });
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </div>
      </Dialog>
    </div>
  );
}

function getFieldsForContent(
  bin: BinObj,
  index: number,
  updateCallback: (bin: BinObj) => void
): JSX.Element {
  switch (bin.content[index].contentType) {
    case undefined: {
      return <p>content_type undefined</p>;
    }
    case "empty":
      return (<div/>);
    case "bolt":
      return (<BoltEdit bin={bin} index={index} updateCallback={updateCallback} />);
    case "washer":
      return (<WasherEdit bin={bin} index={index} updateCallback={updateCallback} />);
    case "screw":
      return (<ScrewEdit bin={bin} index={index} updateCallback={updateCallback} />);
    default:
      return <p>{`${bin.content[index].contentType} is undefined`}</p>;
  }
}
