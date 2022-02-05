import logo from './logo.svg';
import React from 'react';
import * as get from './net/get.js'
import './containers.css';
import Container from "./Container";
import SideMenu from "./SideMenu";

function App() {
    const [containers, setContainerList] = React.useState([]);
    const [container, setContainer] = React.useState(
        {
            width: 0,
            height: 0,
            box: "",
            color: {R: 0, G: 0, B: 0, A: 0},
            bins: [],
            unit: "px",
        }
    );
    React.useEffect(() => {
        get.fetchBins().then(resp => {
            setContainerList(resp)
            if (resp.length > 0) {
                setContainer(resp[0])
            }
        })
    }, []);

    return <div
        style={{
            display: "grid",
            gridTemplateColumns: `auto 1fr`,
        }}>
        <div>
            <SideMenu containers={containers} setOptionCallback={setContainer}/>
        </div>
        <div
            style={{
                gridColumnStart: 2,
                width: `${container.width}${container.unit}`,
                fontSize: "32pt",
                fontFamily: "FontAwesome, sans-serif",
                color: "white",
                padding: "10px"
            }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                <Container container={container}/>
            </div>
        </div>
    </div>
}

export default App;
