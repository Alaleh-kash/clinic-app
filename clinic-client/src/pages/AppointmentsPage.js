// src/pages/AppointmentsPage.js
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
import { getAppointments } from "../api";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppointments()
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Appointments
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
                <TableCell>Patient</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.id}</TableCell>
                  <TableCell>
                    {a.patient?.firstName} {a.patient?.lastName}
                  </TableCell>
                  <TableCell>
                    {a.doctor?.firstName} {a.doctor?.lastName}
                  </TableCell>
                  <TableCell>{a.startTime?.replace("T", " ")}</TableCell>
                  <TableCell>{a.endTime?.replace("T", " ")}</TableCell>
                  <TableCell>{a.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}

export default AppointmentsPage;
