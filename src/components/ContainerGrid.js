import Bin from "./Bin";
import React from "react";

export function ContainerGrid({container, bins, removeCallback, updateCallback, children}) {

    return <div
        className={'grid-container'}
        style={{
            width: `${container.width}${container.unit}`,
            gridTemplateColumns: `repeat(${container.width}, 1${container.unit})`,
            gridTemplateRows: `repeat(${container.height}, 1${container.unit})`,
        }}
    >
        {children}
        {
            bins.map((bin, index) => (
                <Bin
                    removeCallback={removeCallback}
                    updateCallback={updateCallback}
                    className="grid-bin"
                    key={`bin-${bin.id}`}
                    index={index}
                    container={container}
                    bin={bin}/>
            ))
        }
    </div>
}
