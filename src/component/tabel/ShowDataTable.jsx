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
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import useFetchServiceUnit from "../hook/useFetchServiceUnit";

export function ShowData() {
  const [open, setOpen] = useState({}); // Menyimpan status collapse untuk setiap unit
  const [page, setPage] = useState(0); // Menyimpan halaman yang sedang aktif
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah item per halaman
  const [nestedOpen, setNestedOpen] = useState({}); // Menyimpan status collapse untuk setiap service

  const {
    data: service,
    loading: serviceLoading,
    error: serviceError,
  } = useFetchServiceUnit("http://localhost:3000/api/type-units");

  if (!Array.isArray(service)) {
    return (
      <div>Error: Expected an array for typeUnit, but got {typeof service}</div>
    );
  }

  if (serviceLoading) return <div>Loading...</div>;
  if (serviceError) return <div>Error loading data</div>;

  const toggleOpen = (unitId) => {
    setOpen((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const toggleNestedOpen = (serviceId) => {
    setNestedOpen((prev) => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Fungsi untuk mengubah jumlah baris per halaman
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset halaman ke 0 ketika jumlah baris per halaman diubah
  };

  // Menghitung total serviceItem
  const totalServiceItems = service.reduce(
    (acc, unit) => acc + unit.service.length,
    0
  );

  // Mengambil data yang akan ditampilkan berdasarkan halaman
  const getServiceItemsForPage = () => {
    const startIdx = page * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    let flatServiceItems = [];

    // Flattening data service untuk unit dan service mereka
    service.forEach((unit) => {
      unit.service.forEach((serviceItem) => {
        flatServiceItems.push(serviceItem);
        console.log(flatServiceItems);
        console.log(service);
        
        
      });
    });

    return flatServiceItems.slice(startIdx, endIdx);
  };

  const serviceItemsForCurrentPage = getServiceItemsForPage();

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={6}
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                Record Data Preventive Maintenance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {service.map((data) => (
              <React.Fragment key={data.id}>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell sx={{ width: "1px" }}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => toggleOpen(data.id)} // Toggle collapse untuk unit
                    >
                      {open[data.id] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <Typography>{data.name}</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{ "& > *": { borderBottom: "unset" } }}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open[data.id]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Table size="small">
                          <TableBody>
                            {data.service.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={6} align="center">
                                  No data available
                                </TableCell>
                              </TableRow>
                            ) : (
                              data.service
                                .filter((serviceItem) =>
                                  serviceItemsForCurrentPage.includes(
                                    serviceItem
                                  )
                                )
                                .map((serviceItem, index) => (
                                  <React.Fragment key={serviceItem.id}>
                                    <TableRow
                                      sx={{
                                        "& > *": { borderBottom: "unset" },
                                      }}
                                    >
                                      <TableCell sx={{ width: "30px" }}>
                                        <IconButton
                                          aria-label="expand row"
                                          size="small"
                                          onClick={() =>
                                            toggleNestedOpen(serviceItem.id)
                                          } // Toggle collapse dalam
                                        >
                                          {nestedOpen[serviceItem.id] ? (
                                            <KeyboardArrowUpIcon />
                                          ) : (
                                            <KeyboardArrowDownIcon />
                                          )}
                                        </IconButton>
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        align="left"
                                      >
                                        <Typography>
                                          {serviceItem.unit}
                                        </Typography>
                                      </TableCell>
                                    </TableRow>

                                    <TableRow>
                                      <TableCell
                                        sx={{
                                          "& > *": { borderBottom: "unset" },
                                        }}
                                        style={{
                                          paddingBottom: 0,
                                          paddingTop: 0,
                                        }}
                                        colSpan={6}
                                      >
                                        <Collapse
                                          in={nestedOpen[serviceItem.id]}
                                          timeout="auto"
                                          unmountOnExit
                                        >
                                          <Box>
                                            <Table>
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell
                                                    sx={{ fontWeight: "bold", textAlign:'center' }}
                                                  >
                                                    No
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ fontWeight: "bold", textAlign:'center' }}
                                                  >
                                                    HM
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ fontWeight: "bold", textAlign:'center' }}
                                                  >
                                                    PM
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ fontWeight: "bold", textAlign:'center' }}
                                                  >
                                                    Mulai Service
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ fontWeight: "bold", textAlign:'center' }}
                                                  >
                                                    Selesai Service
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ fontWeight: "bold", textAlign:'center' }}
                                                  >
                                                    Lokasi
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ fontWeight: "bold", textAlign:'center', width:'15em' }}
                                                  >
                                                    Action
                                                  </TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                                <TableRow>
                                                  <TableCell sx={{textAlign:'center'}}>
                                                    {index +1}
                                                  </TableCell>
                                                  <TableCell sx={{textAlign:'center'}}>
                                                    {serviceItem.hm}
                                                  </TableCell>
                                                  <TableCell sx={{textAlign:'center'}}>
                                                    {serviceItem.pm}
                                                  </TableCell>
                                                  <TableCell sx={{textAlign:'center'}}>
                                                    {new Date(
                                                      serviceItem.start
                                                    ).toLocaleString()}
                                                  </TableCell>
                                                  <TableCell sx={{textAlign:'center'}}>
                                                    {new Date(
                                                      serviceItem.end
                                                    ).toLocaleString()}
                                                  </TableCell>
                                                  <TableCell sx={{textAlign:'center'}}>
                                                    {serviceItem.location}
                                                  </TableCell>
                                                  <TableCell>
                                                    <Tooltip title="View" arrow>
                                                    <IconButton>
                                                      <RemoveRedEyeOutlinedIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit" arrow>
                                                    <IconButton>
                                                      <EditOutlinedIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete" arrow>
                                                    <IconButton>
                                                      <DeleteForeverOutlinedIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Print" arrow>
                                                    <IconButton>
                                                      <LocalPrintshopOutlinedIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                  </TableCell>
                                                </TableRow>
                                              </TableBody>
                                            </Table>
                                          </Box>
                                          <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={totalServiceItems} // Total jumlah service items
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={
                                              handleChangeRowsPerPage
                                            }
                                          />
                                        </Collapse>
                                      </TableCell>
                                    </TableRow>
                                  </React.Fragment>
                                ))
                            )}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ShowData;
