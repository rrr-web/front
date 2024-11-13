import { 
    Container, 
    TextField, 
    InputLabel
    , Typography
    , Grid2, 
    Select, 
    MenuItem, 
    FormControl } from "@mui/material";
import { useState, useEffect } from "react";

export function FormPrev( { onChange }) {
    const [unit, setUnit] = useState('');
    const [hm, setHm] = useState('');
    const [pm, setPM] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [location, setLocation]= useState('')

    useEffect(() => {
        onChange({ unit, hm, pm, start, end, location });
      }, [unit, hm, pm, start, end, location, onChange]);

    return (
        <>
            <header style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Typography variant="h3" sx={{
                    fontWeight: "1000",
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                }}>
                    Preventive Maintenance
                </Typography>
            </header>

            <Container
                sx={{
                    marginTop: '34px',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: "center",
                    width: { xs: "90%", sm: "70%", md: "50%" }, // Responsif
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}
            >
                <Typography variant="h4" sx={{
                    fontWeight: "700",
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    margin: "30px 0"
                }}>
                    Keterangan Unit
                </Typography>
                <main>
                    <Grid2 container spacing={2} flexDirection={"column"} justifyContent={"center"}>
                        <Grid2 xs={12} sm={6}>
                            <TextField
                                label="No Unit"
                                type="text"
                                size="small"
                                variant="outlined"
                                onChange={(e)=> {
                                    setUnit(e.target.value)
                                    handleChange()
                                }}
                                value={unit}
                                fullWidth
                                required
                                
                            />
                        </Grid2>
                        <Grid2 xs={12} sm={6}>
                            <TextField
                                label="No Hm"
                                onChange={(e)=> {
                                    setHm(e.target.value)
                                    handleChange()
                                }}
                                value = {hm}
                                size="small"
                                type="number"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid2>
                        <FormControl>
                        <InputLabel id="pm-label">PM</InputLabel>
                        <Select
                            labelId="pm-label"
                            value={pm}
                            onChange={(e)=> {
                                setPM(e.target.value)
                            }}
                            autoWidth
                            size="small"
                            variant="outlined"
                            fullWidth
                            required                       
                        >
                            <MenuItem value="">
                                <em>Pilih Jenis Service</em>
                            </MenuItem>
                            <MenuItem value={"pm250"}>Preventive Maintenance 250</MenuItem>
                            <MenuItem value={"pm500"}>Preventive Maintenance 500</MenuItem>
                            <MenuItem value={"pm1000"}>Preventive Maintenance 1000</MenuItem>
                            <MenuItem value={"pm2000"}>Preventive Maintenance 2000</MenuItem>
                        </Select>
                        </FormControl>
                        <Grid2 xs={12} sm={6}>
                            <TextField
                                label="Mulai"
                                type="datetime-local"
                                variant="outlined"
                                size="small"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                fullWidth
                                value={start}
                                onChange={(e)=>{ 
                                    setStart(e.target.value)
                                }}
                                required
                            />
                        </Grid2>
                        <Grid2 xs={12} sm={6}>
                            <TextField
                                label="Selesai"
                                type="datetime-local"
                                variant="outlined"
                                size="small"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                fullWidth
                                value={end}
                                onChange={(e)=>{
                                     setEnd(e.target.value)
                                }}
                                required
                                
                            />
                        </Grid2>
                        <Grid2 xs={12} sm={6}>
                            <TextField
                                label="Lokasi"
                                onChange={(e)=> {
                                    setLocation(e.target.value)
                                }}
                                value = {location}
                                size="small"
                       
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid2>
                    </Grid2>
                </main>
            </Container>
        </>
    );
}
