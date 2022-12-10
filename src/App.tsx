import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Styles } from "./styles/Styles";

export class App extends React.Component {
  render() {
    return (
      <Styles>
        <RouterProvider router={router} />
      </Styles>
    );
  }
}
