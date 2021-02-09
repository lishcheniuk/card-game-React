import React, { useState } from "react";
import "./App.scss";
import { MainScreen } from "./containers/MainScreen";
import { StartScreen } from "./containers/StartScreen";

function App() {
  const [screen, setScreen] = useState(true);

  const switchScreen = () => {
    setScreen((prev) => !prev);
  };

  return (
    <div className="App">
      {screen ? (
        <StartScreen startGame={switchScreen} />
      ) : (
        <MainScreen exitGame={switchScreen} />
      )}
    </div>
  );
}

export default App;
