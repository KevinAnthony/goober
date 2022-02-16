import React from 'react';
import {getContainerAll} from './net/container.js'
import './containers.css';
import Container from "./components/Container";
import SideMenu from "./components/SideMenu";
import env from "react-dotenv";

function App() {
    const [containers, setContainerList] = React.useState([]);
    const [container, setContainer] = React.useState(
        {
            width: 0,
            height: 0,
            box: "",
            color: {r: 0, g: 0, b: 0, a: 0},
            bins: [],
            unit: "px",
        }
    );

    console.log("env", process.env)
    React.useEffect(() => {
        getContainerAll().then(resp => {
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
