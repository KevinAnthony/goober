import React from "react";
import "./App.css";
import "./containers.css";
import ThemeWrapper from "./ThemeWrapper";
import MainWindow from "./MainWindow";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeWrapper>
      <div>
        <Toaster />
      </div>
      <MainWindow />
    </ThemeWrapper>
  );
}

export default App;
