import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { api } from "../utils/api";
import type { Profile } from "../utils/api"; // Import Profile type

interface ProfileFormValues {
  name: string;
  email: string;
  age: string; // Formik treats all input values as strings
}

export const Form: React.FC = () => {
  const { setProfile } = useProfile();
  const [feedback, setFeedback] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);
  const [profileToEdit, setProfileToEdit] = useState<ProfileFormValues | null>(
    null
  );
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from the query parameters in the URL (e.g. /profile-form?email=email@example.com)
  useEffect(() => {
    const emailToEdit = new URLSearchParams(location.search).get("email");
    if (emailToEdit) {
      api
        .fetchProfile(emailToEdit)
        .then((profile) => {
          setProfileToEdit({
            name: profile.name,
            email: profile.email,
            age: profile.age?.toString() || "", // Convert age to string for the form
          });
        })
        .catch((error) => {
          setFeedback({ message: error.message, severity: "error" });
        });
    }
  }, [location.search]); // Only re-run when the location changes (email parameter changes)

  const formik = useFormik<ProfileFormValues>({
    initialValues: { name: "", email: "", age: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      age: Yup.string()
        .optional()
        .test("is-valid-age", "Age must be a number", (value) => {
          if (!value) return true; // Age is optional
          const num = Number(value);
          return !isNaN(num) && num >= 0;
        }),
    }),
    onSubmit: async (values) => {
      const formattedValues = {
        ...values,
        age: values.age ? Number(values.age) : undefined, // Convert age to number
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
  });

  // Pre-fill form fields with profileToEdit data, but only if it's changed
  useEffect(() => {
    if (profileToEdit && !formik.values.email) {
      formik.setValues(profileToEdit);
    }
  }, [profileToEdit, formik]);

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
