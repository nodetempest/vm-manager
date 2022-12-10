import React from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import data from "./data.json";

console.log(1313, data);

export const Test = () => {
  return (
    <Stack spacing={1}>
      {[100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((fontWeight) => (
        <Box display="flex" gap={2}>
          <Typography fontWeight={fontWeight}>
            OpenSans Regular {fontWeight}
          </Typography>
          <Typography fontStyle="italic" fontWeight={fontWeight}>
            OpenSans Italic {fontWeight}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};
