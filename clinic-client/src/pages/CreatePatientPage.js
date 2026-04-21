// src/pages/CreatePatientPage.js
import React, { useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { createPatient } from "../api";
import { useNavigate } from "react-router-dom";

function CreatePatientPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createPatient(form);
      alert("Patient created!");
      navigate("/patients");
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add Patient
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            margin="normal"
            value={form.firstName}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            margin="normal"
            value={form.lastName}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="phone"
            label="Phone"
            margin="normal"
            value={form.phone}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            SAVE
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default CreatePatientPage;
