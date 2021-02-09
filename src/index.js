import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RootState } from "./context/rootState";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <RootState>
      <App />
    </RootState>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
