import * as React from "react";
import { Box } from "@mui/material";

export type TFooterProps = {
  children: React.ReactNode;
};

export class Footer extends React.Component<TFooterProps> {
  render() {
    return (
      <Box
        component="footer"
        sx={{
          padding: "20px 40px",
          borderTop: "1px solid",
          borderColor: "grey.300",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "1280px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "end",
            flexGrow: 1,
          }}
        >
          {this.props.children}
        </Box>
      </Box>
    );
  }
}
