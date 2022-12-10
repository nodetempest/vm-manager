import React from "react";
import ReactDOM from "react-dom/client";

import { Styles } from "./styles/Styles";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Styles>
      <App />
    </Styles>
  </React.StrictMode>
);
