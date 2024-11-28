import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Visibility } from "@mui/icons-material";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 5, px: 2 }}>
      <Typography variant="h4" gutterBottom color="#0074ff" fontWeight={"bold"}>
        Welcome to Profile Management App
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Seamlessly manage your profile with a modern interface. Get started
        below!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Stacks on mobile, side-by-side on larger screens
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          mt: 5,
        }}
      >
        {/* Create/Update Profile Card */}
        <Card
          sx={{
            width: { xs: "100%", sm: "45%" }, // Full width on mobile, 45% on larger screens
            height: "250px",
            bgcolor: "#eef2fe",
            color: "text.primary",
            boxShadow: 4, // Elevation for shadow effect
            borderRadius: 3,
            textAlign: "center",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => navigate("/profile-form")}
        >
          <CardActionArea sx={{ height: "100%", p: 3 }}>
            <Edit sx={{ fontSize: 60, mb: 2, color: "#308bfe" }} />
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Create/Update Profile
              </Typography>
              <Typography variant="body2">
                Start by creating or editing your profile to keep your details
                up-to-date.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* View Profile Card */}
        <Card
          sx={{
            width: { xs: "100%", sm: "45%" },
            height: "250px",
            bgcolor: "#eef2fe",
            color: "text.primary",
            boxShadow: 4,
            borderRadius: 3,
            textAlign: "center",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => navigate("/profile")}
        >
          <CardActionArea sx={{ height: "100%", p: 3 }}>
            <Visibility sx={{ fontSize: 60, mb: 2, color: "#308bfe" }} />
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                View Profile
              </Typography>
              <Typography variant="body2">
                Check your existing profile details for updates or deletion.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};
