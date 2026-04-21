// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import NavBar from "./components/NavBar";
import DoctorsPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import CreatePatientPage from "./pages/CreatePatientPage"; // ✅ ADD THIS

function HomePage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Clinic Dashboard
      </Typography>
      <Typography color="text.secondary">
        Welcome! Use the navigation above to manage doctors, patients, and
        appointments.
      </Typography>
    </Box>
  );
}

function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />

          {/* ✅ NEW PAGE */}
          <Route path="/patients/create" element={<CreatePatientPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;


