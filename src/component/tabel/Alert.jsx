// Suggested code may be subject to a license. Learn more: ~LicenseLog:717387771.

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function FilledAlerts({ errors }) {
  // Tambahkan pengecekan kondisi
  if (!errors || !Array.isArray(errors) || errors.length === 0) {
    return null; // Atau tampilkan pesan default jika errors kosong
  }

  return (
    <Stack
    sx={{
      width: "100%",
      position: "fixed", // Posisi tetap
      top: 0, // Di bagian atas
      left: 0,
      zIndex: 1000, // Z-index tinggi
      backgroundColor: "#fff", // Latar belakang putih (opsional)
      padding: "10px",
    }}
    spacing={2}
  >
    {errors.map((error, index) => (
      <Alert key={index} variant="filled" severity="error">
        {error}
      </Alert>
    ))}
  </Stack>
);
}
