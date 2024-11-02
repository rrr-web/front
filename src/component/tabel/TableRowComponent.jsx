import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

function TableRowComponent({ row, rowIndex, handleCheckboxChange, handleKeteranganChange }) {
  return (
    <TableRow key={row.no}>
      <TableCell style={{ position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 1 }}>
        {row.no}
      </TableCell>
      <TableCell style={{ position: 'sticky', left: 50, backgroundColor: '#fff', zIndex: 1 }}>
        {row.part}
      </TableCell>
      <TableCell>{row.check}</TableCell>
      <TableCell>{row.spec}</TableCell>
      <TableCell align="center">
        <Checkbox
          checked={row.sudahDikerjakan?.ya || false}
          onChange={() => handleCheckboxChange(rowIndex, 'ya')}
          color="primary"
        />
        Ya
        <Checkbox
          checked={row.sudahDikerjakan?.tidak || false}
          onChange={() => handleCheckboxChange(rowIndex, 'tidak')}
          color="secondary"
        />
        Tidak
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          multiline
          variant="outlined"
          value={row.keterangan || ''} // Mencegah nilai undefined
          onChange={(e) => handleKeteranganChange(rowIndex, e.target.value)}
          rows={2}
        />
      </TableCell>
    </TableRow>
  );
}

export default TableRowComponent;
