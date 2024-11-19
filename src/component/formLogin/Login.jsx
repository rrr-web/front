import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function Login(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user, password)
    }

    return(
        <>
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                marginTop: '100px',
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Sign Your Account
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                
                <TextField 
                    label="Username" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    required
                    autoComplete="current-username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)} 
                />
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    fullWidth 
                    margin="normal" 
                    required
                    autoComplete="current-password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ padding: '10px 20px', marginTop: '10px', fontSize: '16px' }}
                    onClick={handleSubmit} 
                >
                    Login
                </Button>
            </Box>
        </Container>
        </>
    )
}