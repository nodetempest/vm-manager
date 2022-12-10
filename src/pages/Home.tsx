import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Paper, Button, Typography } from "@mui/material";

export class Home extends React.Component {
  render() {
    return (
      <Box
        sx={{
          bgcolor: "grey.200",
          width: "100vw",
          height: "100vh",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          sx={{
            bgcolor: "grey.A100",
            padding: "32px 64px 70px",
            mt: "-200px",
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            Manage Virtual Machines
          </Typography>
          <Box sx={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Button
              component={Link}
              to="/add-vm"
              sx={{ p: "32px 64px" }}
              variant="contained"
            >
              Add VM
            </Button>
            <Button
              component={Link}
              to="/vm-list"
              sx={{ p: "32px 64px" }}
              variant="contained"
            >
              VM List
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }
}
