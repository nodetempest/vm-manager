import * as React from "react";
import { Box, Button } from "@mui/material";

import { Footer } from "@/layouts/VMWizard/Footer";

export class VMList extends React.Component {
  render() {
    return (
      <>
        <Box
          component="main"
          sx={{
            p: "40px",
            flexGrow: 1,
            maxWidth: "1360px",
            alignSelf: "center",
            width: 1,
          }}
        >
          VMList
        </Box>
        <Footer>
          <Button variant="contained">Close</Button>
        </Footer>
      </>
    );
  }
}
