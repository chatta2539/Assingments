import React, { useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { Container, Grid, TextField, Typography, Button, CssBaseline, Box } from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { api_end_point } from '../utils/EndPoint';
import Navbar from '../components/navbar.component';


function RegisterDevice() {

    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const [devicename, setDevicename] = useState('')
    const token = localStorage.getItem('token')

    console.log(devicename)
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };

        fetch(api_end_point + "/api/login/auth", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                const resultJson = JSON.parse(result)
                if (resultJson.message === "Unauthorized") {
                    navigate('/')
                    Swal.fire("Unauthorized Please login")
                }
            })
            .catch(error => console.log('error', error));
    },);
        const handleSubmit = (event: FormEvent) => {
            event.preventDefault();
            var myHeaders = new Headers();

            myHeaders.append("Authorization", "Bearer " + token);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow' as RequestRedirect
            };

            fetch(api_end_point + "/api/device/" + devicename, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    const resultJson = JSON.parse(result);
                    if (resultJson.message === "Unauthorized") {
                        navigate('/')
                        Swal.fire("Unauthorized Please login")
                    }
                    if (resultJson.message === `Device ${devicename} created successfully`) {
                        MySwal.fire({
                            html: <i>{resultJson.message}</i>,
                            icon: 'success'
                        }).then((value) => {
                            navigate('/devicepage')
                        })
                    } else {
                        MySwal.fire({
                            html: <i>{resultJson.message}</i>,
                            icon: 'error'
                        })
                    }

                })
                .catch(error => console.log('error', error));
        }

        return (

            <React.Fragment>
                <CssBaseline />
                <Navbar />

                <Container maxWidth="sm" sx={{ p: 2 }}>
                    <Box display="flex" marginBottom={2} >
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" gutterBottom>
                                ADD DEVICE
                            </Typography>
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={() => navigate('/devicepage')}>Back</Button>
                        </Box>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="outlined-required" label="Device Name" fullWidth required
                                    onChange={(e) => setDevicename(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' variant="contained" fullWidth >ADD DEVICE</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </React.Fragment>
        );
    }

    export default RegisterDevice