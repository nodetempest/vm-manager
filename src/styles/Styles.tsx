import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./theme";

export type TStylesProps = {
  children: React.ReactNode;
};

export class Styles extends React.Component<TStylesProps> {
  render() {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {this.props.children}
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
}
