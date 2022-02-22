import { format, fraction } from "mathjs";
import { ColorObj } from "../model/color";

export function splitAndUppercase(str: string | undefined): string {
  if (!str) {
    return "undefined";
  }
  return str
    .split("_")
    .map((name) => {
      return name[0].toUpperCase() + name.slice(1);
    })
    .join(" ");
}

export function decToFraction(length: number | undefined): string {
  if (!length) {
    return "0/0";
  }
  if (length < 1) {
    return format(fraction(length), { fraction: "ratio" });
  }
  const int = Math.floor(length);
  const remainder = length - int;
  return remainder > 0
    ? `${int} ${format(fraction(remainder), { fraction: "ratio" })}`
    : `${int}`;
}

export function hex2rgb(hex: string): ColorObj {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return ColorObj.Parse({ r: r, g: g, b: b, a: 1 });
}

export function rgb2hex(color: ColorObj): string {
  var rgb = (color.r << 16) | (color.g << 8) | color.b;
  return "#" + rgb.toString(16).padStart(6, "0");
}
