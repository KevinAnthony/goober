import React from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
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
import { Drawer } from "antd";
import { hex2rgb, rgb2hex } from "../../util/formatting";
import { BinObj } from "../../model/bin";
import { OutlinedBox } from "./OutlineBox";
import { ColorButton } from "./ColorButton";
import { BoltObj } from "../../model/bolt";
import { WasherObj } from "../../model/washer";
import { ScrewObj } from "../../model/screw";
import { SimpleObj } from "../../model/simple";
import { BinNet } from "../../net/bin";
import { WasherEdit } from "./subedit/WasherEdit";
import { BoltEdit } from "./subedit/BoltEdit";
import { ScrewEdit } from "./subedit/ScrewEdit";
import { SimpleEdit } from "./subedit/SimpleEdit";
import { parseNumber } from "../../util/utils";
import { NailObj } from "../../model/nail";
import { NailEdit } from "./subedit/NailEdit";
import { NutEdit } from "./subedit/NutEdit";
import styles from "./drawer.module.css";
import "./drawer.css";

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

  function onContentChanged(event: React.ChangeEvent<HTMLInputElement>) {
    binState.content[contentIndex].contentType = event.target.value;
    binState.content[contentIndex].bolt = BoltObj.Empty();
    binState.content[contentIndex].screw = ScrewObj.Empty();
    binState.content[contentIndex].washer = WasherObj.Empty();
    binState.content[contentIndex].nail = NailObj.Empty();
    binState.content[contentIndex].simple = SimpleObj.Empty();

    setBin(binState);
    setContainer(getFieldsForContent(binState, 0, updateCallback));
  }

  function onColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedColor(event.target.value);
    binState.color = hex2rgb(event.target.value);
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
      <Drawer
        title={<div className={styles.drawer_title}>{title}</div>}
        placement="right"
        size="large"
        closable={false}
        open={binIndex >= 0}
        extra={
          <div className={styles.button_div}>
            <button
              className={styles.confirmation_button}
              onClick={closedCallback}
            >
              Save
            </button>
            <button
              className={styles.confirmation_button}
              onClick={closedCallback}
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className={styles.drawer_inner}>
          <div onChange={onContentChanged} className={styles.content_button}>
            <input
              type="radio"
              value="empty"
              name="content_type"
              id="empty"
              checked={"empty" === binState.content[contentIndex].contentType}
            />
            <label htmlFor="empty">Empty</label>
            <input
              type="radio"
              value="bolt"
              name="content_type"
              id="bolt"
              checked={"bolt" === binState.content[contentIndex].contentType}
            />
            <label htmlFor="bolt">Bolt</label>
            <input
              type="radio"
              value="nut"
              name="content_type"
              id="nut"
              checked={"nut" === binState.content[contentIndex].contentType}
            />
            <label htmlFor="nut">Nut</label>
            <input
              type="radio"
              value="screw"
              name="content_type"
              id="screw"
              checked={"screw" === binState.content[contentIndex].contentType}
            />
            <label htmlFor="screw">Screw</label>
            <input
              type="radio"
              value="washer"
              name="content_type"
              id="washer"
              checked={"washer" === binState.content[contentIndex].contentType}
            />
            <label htmlFor="washer">Washer</label>
            <input
              type="radio"
              value="nail"
              name="content_type"
              id="nail"
              checked={"nail" === binState.content[contentIndex].contentType}
            />
            <label htmlFor="nail">Nail</label>
            <input
              type="radio"
              value="simple"
              name="content_type"
              id="simple"
              checked={"simple" === binState.content[contentIndex].contentType}
            />
            <label htmlFor="simple">Simple</label>
          </div>
          <form className={styles.location_controls_form}>
            <div className={styles.location_controls_container}>
              <input
                id="loc-x"
                type="number"
                defaultValue={binState.x}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  binState.x = parseNumber(target.value);
                  updateCallback(binState);
                }}
                className={styles.location_controls_input}
                placeholder="a"
              />
              <label htmlFor="loc-x" className={styles.location_controls_label}>
                X
              </label>
            </div>
            <div className={styles.location_controls_container}>
              <input
                id="loc-y"
                type="number"
                defaultValue={binState.y}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  binState.y = parseNumber(target.value);
                  updateCallback(binState);
                }}
                className={styles.location_controls_input}
                placeholder="a"
              />
              <label htmlFor="loc-y" className={styles.location_controls_label}>
                Y
              </label>
            </div>
            <div className={styles.location_controls_container}>
              <input
                id="width"
                type="number"
                defaultValue={binState.width}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  binState.width = parseNumber(target.value);
                  updateCallback(binState);
                }}
                className={styles.location_controls_input}
                placeholder="a"
              />
              <label htmlFor="width" className={styles.location_controls_label}>
                Width
              </label>
            </div>
            <div className={styles.location_controls_container}>
              <input
                id="height"
                type="number"
                defaultValue={binState.height}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  binState.height = parseNumber(target.value);
                  updateCallback(binState);
                }}
                className={styles.location_controls_input}
                placeholder="a"
              />
              <label
                htmlFor="height"
                className={styles.location_controls_label}
              >
                Width
              </label>
            </div>
          </form>
          <div>
            <fieldset className={styles.color_picker}>
              <legend>Bin Color</legend>
              <div onChange={onColorChange}>
                <input
                  type="radio"
                  value={binRed}
                  id="binRed"
                  checked={binRed === selectedColor}
                  style={{ background: binRed }}
                />
                <input
                  type="radio"
                  value={binBlue}
                  id="binBlue"
                  checked={binBlue === selectedColor}
                  style={{ background: binBlue }}
                />
                <input
                  type="radio"
                  value={binGreen}
                  id="binGreen"
                  checked={binGreen === selectedColor}
                  style={{ background: binGreen }}
                />
                <input
                  type="radio"
                  value={binYellow}
                  id="binYellow"
                  checked={binYellow === selectedColor}
                  style={{ background: binYellow }}
                />
                <input
                  type="radio"
                  value={binOrange}
                  id="binOrange"
                  checked={binOrange === selectedColor}
                  style={{ background: binOrange }}
                />
                <input
                  type="radio"
                  value={binGrey}
                  id="binGrey"
                  checked={binGrey === selectedColor}
                  style={{ background: binGrey }}
                />
              </div>
            </fieldset>
          </div>
        </div>
        {/* end of inner drawer*/}
      </Drawer>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        // open={binIndex >= 0}
        open={false}
        onClose={closedCallback}
      >
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
      return <div />;
    case "bolt":
      return (
        <BoltEdit bin={bin} index={index} updateCallback={updateCallback} />
      );
    case "nut":
      return (
        <NutEdit bin={bin} index={index} updateCallback={updateCallback} />
      );
    case "washer":
      return (
        <WasherEdit bin={bin} index={index} updateCallback={updateCallback} />
      );
    case "screw":
      return (
        <ScrewEdit bin={bin} index={index} updateCallback={updateCallback} />
      );
    case "simple":
      return (
        <SimpleEdit bin={bin} index={index} updateCallback={updateCallback} />
      );
    case "nail":
      return (
        <NailEdit bin={bin} index={index} updateCallback={updateCallback} />
      );
    default:
      return <p>{`${bin.content[index].contentType} is undefined`}</p>;
  }
}
