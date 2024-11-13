import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableRowComponent from "./TableRowComponent";
import initialData from "./source/data";
import { TableContainer, TextField } from "@mui/material";

export function CustomTable({ onChange, pmType }) {
  const [data, setData] = useState([]);
  const [backlog, setBacklog] = useState("");

  useEffect(() => {
    // Ambil data yang sesuai dengan pmType dari initialData
    const dataFormType = initialData[pmType] || []
    setData(dataFormType) 
  }, [pmType]);

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
      sudahDikerjakan: row.sudahDikerjakan.ya
    }));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, marginTop: 2,}}>
      <TableContainer component={Paper} sx={{ width: '80%', overflow: 'auto', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
        <Table aria-label="customized table"
        style={{backgroundColor:"white"}}>
          <TableHead sx={{backgroundColor:"teal"}}>
            <TableRow>
              <TableCell style={{ position: 'sticky', left: 0, backgroundColor: 'teal', zIndex: 1, width:"5%", fontWeight:"bold", color:"white" }} >No</TableCell>
              <TableCell style={{ position: 'sticky', left: 50, backgroundColor: 'teal', zIndex: 1, width:"15%", fontWeight:"bold", color:"white"  }}>Deskripsi Item</TableCell>
              <TableCell align="center" style={{width:"15%", fontWeight:"bold", color:"white"}}>Panduan Service</TableCell>
              <TableCell align="center" style={{width:"10%", fontWeight:"bold", color:"white"}}>P.N</TableCell>
              <TableCell align="center" colSpan={2} style={{ verticalAlign: "middle", width:"15%", fontWeight:"bold", color:"white" }}>Sudah Dikerjakan</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={4} />
              <TableCell align="center" style={{fontWeight:"bold", color:"white"}}>Ya</TableCell>
              <TableCell align="center" style={{fontWeight:"bold", color:"white"}}>Tidak</TableCell>
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
          <Box sx={{ px: 2 }}>
        <TextField
        label="Backlog"
        value={backlog}
        multiline
        onChange={handleBacklogChange}
        margin="normal"
        rows={5}
        fullWidth
        />
        </Box>
          <Box sx={{ px: 2 }}>
        <TextField
        label="Keterangan"
        // value={keterangan}
        multiline
        // onChange={handleBacklogChange}
        margin="normal"
        rows={5}
        fullWidth
        />
        </Box>
      </TableContainer>
    </Box>
  );
}
