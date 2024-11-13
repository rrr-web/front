
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
      width: "30%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
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
