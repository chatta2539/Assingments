import React, { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Typography, Button, CssBaseline, Box } from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { api_end_point } from '../utils/EndPoint';
import Navbar from '../components/navbar.component';

function RegisterUser() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        var myHeaders = new Headers();
        const token = localStorage.getItem('token')
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        var rawInput = JSON.stringify({
            username: username,
            password: password,
            email: email,
        });
        console.log(rawInput)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: rawInput,
            redirect: 'follow' as RequestRedirect
        };
        fetch(api_end_point + "/api/user", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                const resultJson = JSON.parse(result);
                if (resultJson.message === "User created successfully") {
                    MySwal.fire({
                        html: <i>{resultJson.message}</i>,
                        icon: 'success'
                    }).then((value) => {
                        navigate('/')
                    })
                } else {
                    MySwal.fire({
                        html: <i>{resultJson.error}</i>,
                        icon: 'error'
                    })
                }
            })
            .catch(error => console.log('error', error));
    }
    return (

        <React.Fragment>
            <CssBaseline />
            <Navbar/>
            <Container maxWidth="sm" sx={{ p: 2 }}>
            <Box display="flex" >
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" gutterBottom>
                            Signup
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" onClick={() => navigate('/')}>Signup</Button>
                    </Box>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField id="outlined-required" label="Username" margin="normal" fullWidth required
                                onChange={(e) => setUsername(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="outlined-required" label="Password" type="password" margin="normal" fullWidth required
                                onChange={(e) => setPassword(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-required" label="E-mail" fullWidth required
                                onChange={(e) => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant="contained" fullWidth >Signup user</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}

export default RegisterUser