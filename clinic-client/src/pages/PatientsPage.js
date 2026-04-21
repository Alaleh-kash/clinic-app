// src/pages/PatientsPage.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
} from "@mui/material";
import { getPatients } from "../api";

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatients()
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Patients
      </Typography>

      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Date of Birth</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.firstName}</TableCell>
                  <TableCell>{p.lastName}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell>{p.dateOfBirth?.split("T")[0]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}

export default PatientsPage;
