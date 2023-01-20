import React from "react";
import { hex2rgb, rgb2hex } from "../../util/formatting";
import { BinObj } from "../../model/bin";
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
import { TextBox } from "../TextBox";
import {
  binBlue,
  binGreen,
  binGrey,
  binOrange,
  binRed,
  binYellow,
} from "../../util/colors";
import { ColorPicker } from "../ColorPicker";
import { Drawer } from "../Drawer";
import { ContentObj } from "../../model/content";

interface props {
  bin: BinObj;
  updateCallback: (bin: BinObj) => void;
  closedCallback: () => void;
  saveCallback: (bin: BinObj, save: boolean) => void;
  removeCallback: (bin: BinObj) => void;
  title: string;
}

export function BinEdit({
  bin,
  closedCallback,
  updateCallback,
  saveCallback,
  removeCallback,
  title,
}: props) {
  const net = new BinNet();
  const [innerContainer, setContainer] = React.useState<JSX.Element>();
  const [binState, setBin] = React.useState<BinObj>(bin);
  const [contentIndex] = React.useState<number>(0);

  React.useEffect(() => {
    setContainer(
      getFieldsForContent(binState.content[contentIndex], onSubeditUpdated)
    );
  }, [bin, binState, updateCallback]);

  const [selectedColor, setSelectedColor] = React.useState<string>(
    rgb2hex(bin.color)
  );

  const [selectedUnit, setSelectedUnit] = React.useState<string>(bin.unit);

  function onContentChanged(event: React.ChangeEvent<HTMLInputElement>) {
    binState.content[contentIndex].contentType = event.target.value;
    binState.content[contentIndex].bolt = BoltObj.Empty();
    binState.content[contentIndex].screw = ScrewObj.Empty();
    binState.content[contentIndex].washer = WasherObj.Empty();
    binState.content[contentIndex].nail = NailObj.Empty();
    binState.content[contentIndex].simple = SimpleObj.Empty();

    setBin(binState);
    setContainer(
      getFieldsForContent(binState.content[contentIndex], onSubeditUpdated)
    );
  }

  function onColorChange(color: string) {
    setSelectedColor(color);
    binState.color = hex2rgb(color);
    setBin(binState);
    updateCallback(binState);
  }

  function onUnitChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedUnit(event.target.value);
    binState.unit = event.target.value;
  }

  function onSave() {
    updateCallback(binState);
    saveCallback(binState, true);
    closedCallback();
  }

  function onCancel() {
    if (!binState.id) {
      removeCallback(binState);
      closedCallback();

      return;
    }
    net.getBin(binState).then((b) => {
      updateCallback(b);
      closedCallback();
    });
  }

  function onSubeditUpdated() {
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
        opened={true}
        onClose={onCancel}
        extra={
          <div className={styles.button_div}>
            <button className={styles.confirmation_button} onClick={onSave}>
              Save
            </button>
            <button className={styles.confirmation_button} onClick={onCancel}>
              Cancel
            </button>
          </div>
        }
      >
        <div className={styles.drawer_inner}>
          <div className={styles.horizontal_toggle_group}>
            <input
              type="radio"
              value="empty"
              id="empty"
              checked={"empty" === binState.content[contentIndex].contentType}
              onChange={onContentChanged}
            />
            <label htmlFor="empty">Empty</label>
            <input
              type="radio"
              value="bolt"
              id="bolt"
              checked={"bolt" === binState.content[contentIndex].contentType}
              onChange={onContentChanged}
            />
            <label htmlFor="bolt">Bolt</label>
            <input
              type="radio"
              value="nut"
              id="nut"
              checked={"nut" === binState.content[contentIndex].contentType}
              onChange={onContentChanged}
            />
            <label htmlFor="nut">Nut</label>
            <input
              type="radio"
              value="screw"
              id="screw"
              checked={"screw" === binState.content[contentIndex].contentType}
              onChange={onContentChanged}
            />
            <label htmlFor="screw">Screw</label>
            <input
              type="radio"
              value="washer"
              id="washer"
              checked={"washer" === binState.content[contentIndex].contentType}
              onChange={onContentChanged}
            />
            <label htmlFor="washer">Washer</label>
            <input
              type="radio"
              value="nail"
              id="nail"
              checked={"nail" === binState.content[contentIndex].contentType}
              onChange={onContentChanged}
            />
            <label htmlFor="nail">Nail</label>
            <input
              type="radio"
              value="simple"
              id="simple"
              checked={"simple" === binState.content[contentIndex].contentType}
              onChange={onContentChanged}
            />
            <label htmlFor="simple">Simple</label>
          </div>
          <form className={styles.location_controls_form}>
            <TextBox
              id="loc-x"
              type="number"
              defaultValue={binState.x}
              label="X"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                binState.x = parseNumber(target.value);
                updateCallback(binState);
              }}
            />
            <TextBox
              id="loc-y"
              type="number"
              defaultValue={binState.y}
              label="Y"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                binState.y = parseNumber(target.value);
                updateCallback(binState);
              }}
            />
            <TextBox
              id="loc-width"
              type="number"
              defaultValue={binState.width}
              label="Width"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                binState.width = parseNumber(target.value);
                updateCallback(binState);
              }}
            />
            <TextBox
              id="loc-height"
              type="number"
              defaultValue={binState.height}
              label="Height"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                binState.height = parseNumber(target.value);
                updateCallback(binState);
              }}
            />
          </form>
          <ColorPicker
            onColorChanged={onColorChange}
            selectedColor={selectedColor}
            colors={[binRed, binBlue, binGreen, binYellow, binOrange, binGrey]}
          />

          <div
            className={styles.horizontal_toggle_group}
            style={{ margin: "18px" }}
          >
            <input
              type="radio"
              value="in"
              id="in"
              checked={"in" === selectedUnit}
              onChange={onUnitChanged}
            />
            <label htmlFor="in">Imperial</label>
            <input
              type="radio"
              value="mm"
              id="mm"
              checked={"mm" === selectedUnit}
              onChange={onUnitChanged}
            />
            <label htmlFor="mm">Metric</label>
            <input
              type="radio"
              value="an"
              id="an"
              checked={"an" === selectedUnit}
              onChange={onUnitChanged}
            />
            <label htmlFor="an">AN</label>
          </div>
          {innerContainer}
        </div>
        {/* end of inner drawer*/}
      </Drawer>
    </div>
  );
}

function getFieldsForContent(
  content: ContentObj,
  updateCallback: () => void
): JSX.Element {
  switch (content.contentType) {
    case undefined: {
      return <p>content_type undefined</p>;
    }
    case "empty":
      return <div />;
    case "bolt":
      return <BoltEdit content={content} updateCallback={updateCallback} />;
    case "nut":
      return <NutEdit content={content} updateCallback={updateCallback} />;
    case "washer":
      return <WasherEdit content={content} updateCallback={updateCallback} />;
    case "screw":
      return <ScrewEdit content={content} updateCallback={updateCallback} />;
    case "simple":
      return <SimpleEdit content={content} updateCallback={updateCallback} />;
    case "nail":
      return <NailEdit content={content} updateCallback={updateCallback} />;
    default:
      return <p>{`content_type ${content.contentType} is undefined`}</p>;
  }
}
