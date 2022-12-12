import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

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
        <Outlet />
      </Box>
    );
  }
}
