import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import type { Profile } from "../utils/api";

export const ProfileComponent: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [feedback, setFeedback] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const profiles = await api.fetchProfiles();
        setProfiles(profiles);
      } catch (error: any) {
        setFeedback({ message: error.message, severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  // UseMemo to compute sorted profiles
  const sortedProfiles = useMemo(() => {
    return [...profiles].sort((a, b) => a.name.localeCompare(b.name));
  }, [profiles]);

  const handleDelete = async (email: string) => {
    try {
      await api.deleteProfile(email);
      setProfiles(profiles.filter((profile) => profile.email !== email));
      setFeedback({
        message: "Profile deleted successfully!",
        severity: "success",
      });
    } catch (error: any) {
      setFeedback({ message: "Failed to delete profile.", severity: "error" });
    }
  };

  if (loading)
    return (
      <>
        <Skeleton variant="rectangular" height={100} sx={{ m: 1 }} />
        <Skeleton variant="rectangular" height={100} sx={{ m: 1 }} />
        <Skeleton variant="rectangular" height={100} sx={{ m: 1 }} />
      </>
    );

  if (!profiles.length) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
        No profiles found. Please create one.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Profile Details</Typography>
      {sortedProfiles.map((profile) => (
        <Box key={profile.email} sx={{ mb: 2 }}>
          <Typography>Name: {profile.name}</Typography>
          <Typography>Email: {profile.email}</Typography>
          <Typography>Age: {profile.age || "N/A"}</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/profile-form?email=${profile.email}`)}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(profile.email)}
            >
              Delete Profile
            </Button>
          </Box>
        </Box>
      ))}
      {feedback && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={() => setFeedback(null)}
        >
          <Alert severity={feedback.severity} onClose={() => setFeedback(null)}>
            {feedback.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};
