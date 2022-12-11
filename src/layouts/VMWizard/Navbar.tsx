import * as React from "react";
import { Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

class Base extends React.Component<TWithNavigateProps> {
  render() {
    return (
      <Box
        component="nav"
        sx={{
          display: "flex",
          alignItems: "center",
          p: "20px 40px",
          bgcolor: "grey.900",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "1280px",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Routes>
            <Route
              path="/add-vm"
              element={
                <Typography variant="h6" sx={{ color: "common.white" }}>
                  Add Virtual Machine
                </Typography>
              }
            />
            <Route
              path="/vm-list"
              element={
                <Typography variant="h6" sx={{ color: "common.white" }}>
                  Nutanix mine with veem cluster setup
                </Typography>
              }
            />
          </Routes>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: "1px",
                bgcolor: "common.white",
                height: "24px",
                mr: 1,
              }}
            />
            <IconButton
              sx={{ color: "common.white" }}
              onClick={() => this.props.navigate("/")}
            >
              <Close sx={{ color: "common.white" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }
}

export type TWithNavigateProps = {
  navigate: NavigateFunction;
};

const withNavigate = <P extends TWithNavigateProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof TWithNavigateProps>> => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...(props as P)} navigate={navigate} />;
  };
};

export const Navbar = withNavigate(Base);
