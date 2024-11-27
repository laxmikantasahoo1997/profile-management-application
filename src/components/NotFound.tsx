import React from "react";
import { Typography, Box } from "@mui/material";

export const NotFound: React.FC = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4">404 - Page Not Found</Typography>
    </Box>
  );
};
