import React from "react";
import { ColorObj } from "../model/color";

interface props {
  x: number;
  y: number;
  background: ColorObj;
}

export function BackgroundGrid({ x, y, background }: props) {
  x += 1;
  y += 1;
  const stopX = x + 1;
  const stopY = y + 1;
  return (
    <div
      className="grid-grid"
      style={{
        gridColumnStart: x,
        gridColumnEnd: stopX,
        gridRowStart: y,
        gridRowEnd: stopY,
        backgroundColor: `rgba(${background.r}, ${background.g}, ${background.b}, ${background.a})`,
      }}
    ></div>
  );
}
