import { BinObj } from "../../model/bin";

export const finishes = [
  "stainless_steel",
  "black_oxide",
  "zinc",
  "yellow_zinc",
];
export const boltHeads = ["cap", "hex", "round"];
export var screwHeads = ["round", "flat", "hex", "oval"];
export var screwDrive = [
  "external_hex",
  "internal_hex",
  "phillips",
  "slotted",
  "t25",
];
export const screwTypes = ["machine", "wood", "drywall", "self_tapping"];
export const washerTypes = ["normal", "fender", "split_lock"];

export interface SubEditProps {
  bin: BinObj;
  index: number;
  updateCallback: (bin: BinObj) => void;
}
