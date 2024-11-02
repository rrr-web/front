import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ConfirmationDialog from './ConfirmationDialog';
import TableRowComponent from './TableRowComponent';
import initialData from './data'; // Mengubah nama untuk menghindari bentrok
import { TextField } from '@mui/material';

export function CustomTable() {
  const [data, setData] = useState(initialData); // Menggunakan initialData
  const [open, setOpen] = useState(false);
  const [backlog, setBacklog] = useState(''); // State untuk backlog

  const handleCheckboxChange = (rowIndex, type) => {
    const updatedData = [...data];
    if (type === 'ya') {
      updatedData[rowIndex].sudahDikerjakan.ya = !updatedData[rowIndex].sudahDikerjakan.ya;
      updatedData[rowIndex].sudahDikerjakan.tidak = false;
    } else {
      updatedData[rowIndex].sudahDikerjakan.tidak = !updatedData[rowIndex].sudahDikerjakan.tidak;
      updatedData[rowIndex].sudahDikerjakan.ya = false;
    }
    setData(updatedData);
  };

  const handleKeteranganChange = (rowIndex, value) => {
    const updatedData = [...data];
    updatedData[rowIndex].keterangan = value;
    setData(updatedData);
  };

  const handleBacklogChange = (event) => {
    setBacklog(event.target.value); // Menyimpan nilai backlog
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submittedData = data.map(row => ({
        sudahDikerjakan: row.sudahDikerjakan.ya,
        keterangan: row.keterangan,
      }));

    console.log('Data submitted:', submittedData);
    console.log('Backlog:', backlog);
    setOpen(true);
  };

  const handleClose = (confirmed) => {
    if (confirmed) {
      // Logika pengiriman data bisa ditambahkan di sini
    }
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <Paper sx={{ width: '80%', overflow: 'auto' }}>
        <form onSubmit={handleSubmit}>
          <Table>
            <TableHead sx={{ textAlign: 'center' }}>
              <TableRow>
                <TableCell style={{ position: 'sticky', left: 0, zIndex: 1 }}>No</TableCell>
                <TableCell style={{ position: 'sticky', left: 50, zIndex: 1 }}>Deskripsi Item</TableCell>
                <TableCell>Panduan Service</TableCell>
                <TableCell>P.N</TableCell>
                <TableCell>Sudah Dikerjakan</TableCell>
                <TableCell>Keterangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRowComponent
                  key={row.no}
                  row={row}
                  rowIndex={rowIndex}
                  handleCheckboxChange={handleCheckboxChange}
                  handleKeteranganChange={handleKeteranganChange}
                />
              ))}
            </TableBody>
          </Table>
          <Box sx={{ p: 2 }}>
            <TextField
              label="Backlog"
              multiline
              rows={10} // Jumlah baris yang terlihat
              fullWidth
              variant="outlined"
              value={backlog}
              onChange={handleBacklogChange} // Handle perubahan backlog
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
        <ConfirmationDialog open={open} handleClose={handleClose} />
      </Paper>
    </Box>
  );
}
