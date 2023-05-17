import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ListDevice from '../pages/device.page copy';
import Typography from '@mui/material/Typography';
import AddDevice from './adddevice.compoment';
import { DeviceProps } from "../interfaces/DeviceProps";


export default function List() {
    const [devices, setDevices] = useState<DeviceProps[]>([]);

    return (

        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Box display="flex">
                    <Box sx={{ flexGrow: 1 }}>

                        <Typography variant="h6" gutterBottom>
                            Device List
                        </Typography>
                    </Box>
                    <Box>
                        <AddDevice devices={devices} setDevices={setDevices} />
                    </Box>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
                    {/* <ListDevice/> */}

                </Box>

            </Container>
        </React.Fragment>
    );
}