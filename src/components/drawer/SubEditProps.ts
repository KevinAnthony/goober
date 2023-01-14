import { BinObj } from "../../model/bin";

export const finishes = [
  "stainless_steel",
  "black_oxide",
  "black_phosphate",
  "zinc",
  "yellow_zinc",
  "bright",
  "brass",
];
export const boltHeads = ["cap", "hex", "round", "flat", "flange", "carriage"];
export const screwHeads = ["round", "flat", "hex", "oval"];
export const screwDrive = [
  "external_hex",
  "internal_hex",
  "phillips",
  "slotted",
  "t25",
];
export const nutTypes = [
  "hex",
  "flange",
  "cap",
  "nylock",
  "wing",
  "tee",
  "specialty",
  "coupling",
];
export const screwTypes = ["machine", "wood", "drywall", "self_tapping"];
export const washerTypes = ["normal", "fender", "split_lock"];

export interface SubEditProps {
  bin: BinObj;
  index: number;
  updateCallback: (bin: BinObj) => void;
}
