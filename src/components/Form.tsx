import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { api } from "../utils/api";
import type { Profile } from "../utils/api";

export const Form: React.FC = () => {
  const { setProfile } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [feedback, setFeedback] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const [profileToEdit, setProfileToEdit] = useState<Profile | null>(null);

  // Fetch profile to edit (if email is in query string)
  useEffect(() => {
    const emailToEdit = new URLSearchParams(location.search).get("email");
    if (emailToEdit) {
      api
        .fetchProfile(emailToEdit)
        .then((profile) => setProfileToEdit(profile))
        .catch((error) =>
          setFeedback({ message: error.message, severity: "error" })
        );
    }
  }, [location.search]);

  // Memoize the handleSubmit function using useCallback
  const handleSubmit = useCallback(
    async (values: { name: string; email: string; age: string }) => {
      const formattedValues = {
        ...values,
        age: values.age ? Number(values.age) : undefined, // Convert age to a number
      };

      try {
        const savedProfile = await api.saveProfile(formattedValues);
        setProfile(savedProfile);
        setFeedback({
          message: "Profile saved successfully!",
          severity: "success",
        });
        navigate("/profile");
      } catch (error: any) {
        setFeedback({ message: error.message, severity: "error" });
      }
    },
    [setProfile, navigate]
  );

  const formik = useFormik({
    // Transform `profileToEdit` to match Formik's initialValues type
    initialValues: profileToEdit
      ? {
          name: profileToEdit.name,
          email: profileToEdit.email,
          age: profileToEdit.age?.toString() || "", // Convert `number | undefined` to `string`
        }
      : { name: "", email: "", age: "" }, // Default values for new profile
    enableReinitialize: true, // Allow reinitialization when profileToEdit changes
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "At least 3 characters"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      age: Yup.string()
        .optional()
        .test("is-valid-age", "Age must be a number", (value) => {
          if (!value) return true;
          const num = Number(value);
          return !isNaN(num) && num >= 0;
        }),
    }),
    onSubmit: handleSubmit, // Use the memoized function here
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
    >
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        {...formik.getFieldProps("name")}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        {...formik.getFieldProps("email")}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Age"
        type="number"
        {...formik.getFieldProps("age")}
        error={formik.touched.age && Boolean(formik.errors.age)}
        helperText={formik.touched.age && formik.errors.age}
      />
      <Button fullWidth variant="contained" color="primary" type="submit">
        {profileToEdit ? "Update" : "Save"}
      </Button>
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
