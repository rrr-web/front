import  { useEffect, useState } from "react";
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
  const [information, setInformation] = useState("");

  useEffect(() => {
    // Ambil data yang sesuai dengan pmType dari initialData
    const dataFormType = initialData[pmType] || []
    setData(dataFormType) 
  }, [pmType]);

  useEffect(() =>{
    const getCurrentData = () => {
      return data.map((row) => ({
        sudahDikerjakan: row.sudahDikerjakan.ya
      }));
    };
    onChange({ backlog, information, submittedData: getCurrentData() });
  },[backlog, information, data, onChange])

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
  }

  

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 5}}>
      <TableContainer component={Paper} sx={{ width: '85%', overflow: 'auto', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
        <Table aria-label="customized table">
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
              />
            ))}
          </TableBody>
        </Table>
          <Box sx={{ px: 2, position:"sticky", left:0, zIndex:1 }}>
        <TextField
        label="Backlog"
        value={backlog}
        multiline
        onChange={(e) => setBacklog(e.target.value)}
        margin="normal"
        rows={5}
        fullWidth
        />
        </Box>
          <Box sx={{ px: 2, position:"sticky", left:0, zIndex:1 }}>
        <TextField
        label="information"
        value={information}
        multiline
        onChange={(e)=> setInformation(e.target.value)}
        margin="normal"
        rows={5}
        fullWidth
        style={{paddingBottom:"45px"}}
        />
        </Box>
      </TableContainer>
    </Box>
  );
}


