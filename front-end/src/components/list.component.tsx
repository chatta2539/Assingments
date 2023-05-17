import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ListDevice from '../pages/device.page copy';
import Typography from '@mui/material/Typography';
import AddDevice from './adddevice.compoment';
import { DeviceProps } from "../interfaces/DeviceProps";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { api_end_point } from '../utils/EndPoint';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function createData(
    _id: string,
    devicename: string,
) {
    return { _id, devicename };
}
interface DevicePropsThis {
    _id: string;
    devicename: string;
}

export default function List() {
    const [devices, setDevices] = useState<DeviceProps[]>([]);
    console.log(" list components page " + devices)

    const [data, setData] = useState<DevicePropsThis[]>([]);
    const UserGet = () => {
        const token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };
        console.log(api_end_point)

        fetch(api_end_point + "/api/device", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                const resultJson = JSON.parse(result)
                setData(resultJson.alldevice)
            })
            .catch(error => console.log('error', error));

    }
    useEffect(() => {
        UserGet()
    }, []);

    function UserDelete(id: string, devicename: string): void {
        const confirmDelete = window.confirm(`Are you sure you want to delete user '${devicename}'?`);
        if (confirmDelete) {
            console.log(id + "   " + devicename)

            var myHeaders = new Headers();
            const token = localStorage.getItem('token')
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);

            var raw = JSON.stringify({
                "_id": id,
                "devicename": devicename
            });

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow' as RequestRedirect
            };

            fetch(api_end_point + "/api/device", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    UserGet()
                })
                .catch(error => console.log('error', error));

            UserGet()
        }
    }





    return (

        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Device List
                            </Typography>
                        </Box>
                        <Box>
                            <AddDevice devices={devices} setDevices={setDevices} />
                        </Box>

                    </Box>
                    <TableContainer component={Paper} style={{ marginTop: "10px" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="center">DeviceName</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                        key={row.devicename}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/* <TableCell component="th" scope="row">
                                            {row.devicename}
                                        </TableCell> */}
                                        <TableCell align="left">{row._id}</TableCell>
                                        <TableCell align="center">{row.devicename}</TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup variant="outlined" aria-label="outlined button group">


                                                <AddDevice devices={devices} setDevices={setDevices} />
                                                {/* <Button>Edit</Button> */}
                                                <Button onClick={() => UserDelete(row._id, row.devicename)}>Delete</Button>
                                            </ButtonGroup ></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    );
}