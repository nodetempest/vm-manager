import * as React from "react";
import { Box, Button } from "@mui/material";

import { Footer } from "@/layouts/VMWizard/Footer";

export class AddVM extends React.Component {
  render() {
    return (
      <>
        <Box
          sx={{
            height: "40px",
            borderBottom: "1px solid",
            borderColor: "grey.300",
          }}
        />
        <Box
          component="main"
          sx={{
            p: "20px 40px",
            flexGrow: 1,
            maxWidth: "1360px",
            alignSelf: "center",
            width: 1,
          }}
        >
          AddVM
        </Box>
        <Footer>
          <Button variant="outlined">Back</Button>
          <Button variant="contained">Next</Button>
        </Footer>
      </>
    );
  }
}
