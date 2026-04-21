// src/components/NavBar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function NavBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side: logo + title */}
        <Box display="flex" alignItems="center" gap={1}>
          <LocalHospitalIcon sx={{ fontSize: 32, color: "#1976d2" }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#222",
              fontWeight: 700,
            }}
          >
            Clinic Dashboard
          </Typography>
        </Box>

        {/* Right side: nav buttons */}
        <Box display="flex" gap={1} alignItems="center">
          <Button
            component={Link}
            to="/doctors"
            variant={isActive("/doctors") ? "contained" : "text"}
          >
            Doctors
          </Button>

          <Button
            component={Link}
            to="/patients"
            variant={
              isActive("/patients") || location.pathname.startsWith("/patients/")
                ? "contained"
                : "text"
            }
          >
            Patients
          </Button>

          {/* NEW BUTTON — Add Patient */}
          <Button
            component={Link}
            to="/patients/create"
            variant={
              isActive("/patients/create") ? "contained" : "outlined"
            }
            sx={{ ml: 1 }}
          >
            Add Patient
          </Button>

          <Button
            component={Link}
            to="/appointments"
            variant={
              isActive("/appointments") ||
              location.pathname.startsWith("/appointments/")
                ? "contained"
                : "text"
            }
          >
            Appointments
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
