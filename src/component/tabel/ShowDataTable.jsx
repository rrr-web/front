import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useFetch from "../hook/useFetch"

export function showData() {
  const [open, setOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false)
  const { data, loading, error } = useFetch('http://localhost:3000/formService')


  console.log(data);
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={6}
                sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>Record Data Preventive Maintenance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell sx={{ width: '1px' }}>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row" align="left">
                <Typography>Dump Truck</Typography>
              </TableCell>
            </TableRow>


            <TableRow>
              <TableCell
                sx={{ "& > *": { borderBottom: "unset" } }}
                style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Table size="small">
                      <TableBody>
                        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                          <TableCell sx={{ width: '30px' }}>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => setNestedOpen(!nestedOpen)}
                            >
                              {nestedOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell component='th'>DT0001</TableCell>
                        </TableRow>

                        <TableRow>
                          
                          <TableCell sx={{ "& > *": { borderBottom: "unset" } }}
                style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                              <Box>
                                <Table>
                                  <TableBody>
                                    <TableRow>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>HM</TableCell>
                                          <TableCell>PM</TableCell>
                                          <TableCell>Mulai Service</TableCell>
                                          <TableCell>Selesai Service</TableCell>
                                          <TableCell>Lokasi</TableCell>
                                          <TableCell>Action</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <TableRow>
                                        <TableCell>1200</TableCell>
                                        <TableCell>pm250</TableCell>
                                        <TableCell>wsws</TableCell>
                                        <TableCell>swsw</TableCell>
                                        <TableCell>dwd</TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default showData;
