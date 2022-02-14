import React from "react";
import {BinEdit} from "./BinEdit";

export function BinNew({index, closedCallback, updateCallback}) {
    const [bin] = React.useState({
        color: {r: 0, g: 0, b: 0},
        height: 0,
        width: 0,
        column_start_x: 0,
        column_start_y: 0,
        content: [{
            content_type: "bolt",
            bolt: {}
        }]
    })

    return <BinEdit index={index}
                    bin={bin}
                    title={"New Bin"}
                    closedCallback={closedCallback}
                    saveCallback={updateCallback}
                    updateCallback={updateCallback}/>
}
