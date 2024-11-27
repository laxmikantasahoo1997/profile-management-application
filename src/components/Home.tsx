import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Profile Management App
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Manage your profile details with ease. Click below to get started.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/profile-form")}
        >
          Create/Update Profile
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/profile")}
        >
          View Profile
        </Button>
      </Box>
    </Box>
  );
};
