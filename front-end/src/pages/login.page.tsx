import React, { useState, ChangeEvent, FormEvent } from 'react';
import { UserProps } from '../interfaces/UserProps';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { api_end_point } from '../utils/EndPoint';
import { Container, Grid, TextField, Typography, Button, CssBaseline, Box } from '@mui/material';
import NavbarLogin from '../components/navbar.login.component';


function LoginPage() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const [inputs, setInputs] = useState<UserProps>({ username: '', password: '' });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };
    

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            username: inputs.username,
            password: inputs.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow' as RequestRedirect
        };

        fetch(api_end_point + "/api/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                const resultJson = JSON.parse(result);
                if (resultJson.username === inputs.username) {
                    MySwal.fire({
                        html: <i>{`Hello ${resultJson.username} Have a nich day !`}</i>,
                        icon: 'success'
                    }).then((value) => {
                        localStorage.setItem('token', resultJson.token)
                        navigate('/devicepage')
                    })
                } else {
                    MySwal.fire({
                        html: <i>{`Please signup to my application !`}</i>,
                        icon: 'error'
                    })
                }
            })
            .catch(error => {
                console.log('error', error);
            });




    };

    return (
        
        <React.Fragment>
            <CssBaseline />
            <NavbarLogin />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Box display="flex" marginBottom={2}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" gutterBottom>
                            Login
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" onClick={() => navigate('/signup')}>Signup</Button>
                    </Box>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="outlined-required" label="Username" fullWidth required type="text" name="username" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-required" label="Password" fullWidth required type="password" name="password" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant="contained" fullWidth >Login</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}

export default LoginPage;
