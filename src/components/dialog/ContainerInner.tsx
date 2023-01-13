import React from "react";
import { ContainerObj } from "../../model/container";
import { Dialog } from "../Dialog";
import { TextBox } from "../TextBox";
import { parseNumber } from "../../util/utils";
import { ColorPicker } from "../ColorPicker";
import { hex2rgb, rgb2hex } from "../../util/formatting";
import { binBoschGreen } from "../../util/colors";

interface props {
  container: ContainerObj;
  onSave: (container: ContainerObj) => void;
  onCancel: (container: ContainerObj) => void;
  title?: string;
}

export function ContainerInner({ onSave, onCancel, container, title }: props) {
  const [open, setOpen] = React.useState(true);
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "rgb(77,77,77,1)",
      }}
    >
      <Dialog opened={open} onClose={() => onCancel(container)} title={title}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TextBox
            id="container-name"
            label="Name"
            defaultValue={container.label}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              container.label = event.target.value;
            }}
            style={{ width: "400px" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextBox
              id="loc-width"
              type="number"
              defaultValue={container.width}
              label="Width"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                container.width = parseNumber(target.value);
              }}
            />
            <TextBox
              id="loc-height"
              type="number"
              defaultValue={container.height}
              label="Height"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                container.height = parseNumber(target.value);
              }}
            />
          </div>
          <ColorPicker
            onColorChanged={(color: string) => {
              container.color = hex2rgb(color);
            }}
            selectedColor={rgb2hex(container.color)}
            colors={[binBoschGreen]}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              style={{
                width: "16em",
                height: "4em",
              }}
              onClick={() => {
                onSave(container);
              }}
            >
              Save
            </button>
            <button
              style={{
                width: "16em",
                height: "4em",
              }}
              onClick={() => {
                setOpen(false);
                onCancel(container);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
