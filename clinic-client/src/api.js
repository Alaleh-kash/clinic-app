// src/api.js
// src/api.js
export const API_URL = "http://localhost:5041/api";

// ----------- GET HELPERS ----------------
export async function getPatients() {
  return fetchJson("/patients");
}

export async function getDoctors() {
  return fetchJson("/doctors");
}

export async function getAppointments() {
  return fetchJson("/appointments");
}

// ----------- GENERIC GET ----------------
async function fetchJson(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ----------- GENERIC POST ---------------
export async function postJson(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ----------- CREATE PATIENT -------------
export function createPatient(patient) {
  return postJson("/patients", patient);
}
