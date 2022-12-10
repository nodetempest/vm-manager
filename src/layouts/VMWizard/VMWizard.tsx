import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { Navbar } from "./Navbar";

export class VMWizard extends React.Component {
  render() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Navbar />
        <Outlet />
      </Box>
    );
  }
}
