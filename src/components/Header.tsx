import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add, Visibility } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import logo from "../assets/icon.svg"; // Import the logo

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo and Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "40px", height: "40px" }}
          />
          {!isMobile && ( // Hide text on mobile screens
            <Typography variant="h6">Profile Management</Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: isMobile ? 1 : 2, // Adjust gap based on screen size
            alignItems: "center", // Center-align buttons
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/profile-form")}
            startIcon={!isMobile ? <Add /> : undefined} // Icon-only on mobile
            sx={{
              borderRadius: "20px", // Rounded button
              padding: isMobile ? "6px 12px" : "8px 16px", // Compact padding for mobile
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark", // Hover effect
              },
              textTransform: "capitalize", // Prevent all-uppercase text
            }}
          >
            Create
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/profile")}
            startIcon={!isMobile ? <Visibility /> : undefined} // Icon-only on mobile
            sx={{
              borderRadius: "20px",
              padding: isMobile ? "6px 12px" : "8px 16px",
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
              textTransform: "capitalize",
            }}
          >
            View
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
