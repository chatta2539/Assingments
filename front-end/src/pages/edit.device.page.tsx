import React, { useState, FormEvent, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, TextField, Typography, Button, CssBaseline, Box } from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { api_end_point } from '../utils/EndPoint';
import Navbar from '../components/navbar.component';


function EditDevice() {
    const token = localStorage.getItem('token')
    const { id } = useParams();
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [iddevice, setIddevice] = useState('')
    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };

        fetch(api_end_point + "/api/device/" + id, requestOptions)
            .then(response => response.text())
            .then(result => {
                const resultJson = JSON.parse(result);
                if( resultJson.message === "Unauthorized"){
                    navigate('/')
                    Swal.fire("Unauthorized Please login")
                }
                setName(resultJson['result']['devicename']);
                setIddevice(resultJson['result']['_id']);
            })
            .catch(error => console.log('error', error));

    }, [id])


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify({
            "_id": iddevice,
            "newdevicename": name
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow' as RequestRedirect
        };

        fetch(api_end_point + "/api/device", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                const resultJson = JSON.parse(result);
                MySwal.fire({
                    html: <i>{`Device ${name} already updated`}</i>,
                    icon: 'success'
                }).then((value) => {
                    navigate('/devicepage')
                })
            })
            .catch(error => console.log('error', error));
    }

    return (

        <React.Fragment>
            <CssBaseline />
            <Navbar/>
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
                                onChange={(e) => setName(e.target.value)}
                                value={name} />
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

export default EditDevice