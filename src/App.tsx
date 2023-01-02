import React from "react";
import "./App.css";
import "./containers.css";
import MainWindow from "./MainWindow";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <MainWindow />
    </div>
  );
}

export default App;
