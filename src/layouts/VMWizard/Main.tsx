import * as React from "react";
import { Box } from "@mui/material";

export type TMainProps = {
  children: React.ReactNode;
};

export class Main extends React.Component<TMainProps> {
  render() {
    return (
      <Box component="main" sx={{ flexGrow: 1 }}>
        {this.props.children}
      </Box>
    );
  }
}
