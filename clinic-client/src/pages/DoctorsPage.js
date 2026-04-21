// src/pages/DoctorsPage.js
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
import { getDoctors } from "../api";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDoctors()
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Doctors
      </Typography>

      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Specialty</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.id}</TableCell>
                  <TableCell>{doc.firstName}</TableCell>
                  <TableCell>{doc.lastName}</TableCell>
                  <TableCell>{doc.specialty}</TableCell>
                  <TableCell>{doc.email}</TableCell>
                  <TableCell>{doc.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}

export default DoctorsPage;
