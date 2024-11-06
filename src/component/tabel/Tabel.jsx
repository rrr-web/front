import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableRowComponent from "./TableRowComponent";
import initialData from "./data";
import { TextField } from "@mui/material";

export function CustomTable({ onChange }) {
  const [data, setData] = useState(initialData);
  const [backlog, setBacklog] = useState("");

  const handleCheckboxChange = (rowIndex, type) => {
    const updatedData = [...data];
    if (type === "ya") {
      updatedData[rowIndex].sudahDikerjakan.ya = !updatedData[rowIndex].sudahDikerjakan.ya;
      updatedData[rowIndex].sudahDikerjakan.tidak = false;
    } else {
      updatedData[rowIndex].sudahDikerjakan.tidak = !updatedData[rowIndex].sudahDikerjakan.tidak;
      updatedData[rowIndex].sudahDikerjakan.ya = false;
    }
    setData(updatedData);
    onChange({ backlog, submittedData: getCurrentData() }); // Trigger onChange on checkbox change
  };

  const handleKeteranganChange = (rowIndex, value) => {
    const updatedData = [...data];
    updatedData[rowIndex].keterangan = value;
    setData(updatedData);
    onChange({ backlog, submittedData: getCurrentData() }); // Trigger onChange on keterangan change
  };

  const handleBacklogChange = (event) => {
    setBacklog(event.target.value);
    onChange({ backlog, submittedData: getCurrentData() }); // Trigger onChange on backlog change
  };

  const getCurrentData = () => {
    return data.map((row) => ({
      sudahDikerjakan: row.sudahDikerjakan.ya,
      keterangan: row.keterangan,
    }));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
      <Paper sx={{ width: "80%", overflow: "auto" }}>
        <Table aria-label="customized table">
          <TableHead sx={{ textAlign: "center" }}>
            <TableRow>
              <TableCell style={{ position: "sticky", backgroundColor: "#fff", left: 0, zIndex: 1 }}>No</TableCell>
              <TableCell style={{ position: "sticky", backgroundColor: "#fff", left: 50, zIndex: 1 }}>
                Deskripsi Item
              </TableCell>
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
            rows={10}
            fullWidth
            variant="outlined"
            value={backlog}
            onChange={handleBacklogChange}
          />
        </Box>
      </Paper>
    </Box>
  );
}
