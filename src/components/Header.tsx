import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add, Visibility } from "@mui/icons-material";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Profile Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => navigate("/profile-form")}
            startIcon={<Add />}
          >
            Create
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => navigate("/profile")}
            startIcon={<Visibility />}
          >
            View
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
