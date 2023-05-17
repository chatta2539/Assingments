import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DeviceProps } from '../interfaces/DeviceProps';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { api_end_point } from '../utils/EndPoint';

import withReactContent from 'sweetalert2-react-content'

interface DeviceListProps {
  devices: DeviceProps[];
  setDevices: React.Dispatch<React.SetStateAction<DeviceProps[]>>;
}

const AddDevice: React.FC<DeviceListProps> = ({ devices, setDevices }) => {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()


  const [open, setOpen] = useState(false);
  const [deviceName, setDeviceName] = useState('');

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDeviceName('');
  };

  const handleAddDevice = () => {
    if (deviceName.trim() === '') {
      return;
    }

    const newDevice: DeviceProps = {
      devicename: deviceName.trim(),
    };
    console.log(newDevice)
    // alert(newDevice['devicename'])
    const token = localStorage.getItem('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect
    };

    fetch(api_end_point + "/api/device/" + newDevice['devicename'], requestOptions)
      .then(response => response.text())
      .then(result => {
        const resultJson = JSON.parse(result);
        const message: string = `Device ${newDevice['devicename']} created successfully`

        if (resultJson.message === message) {
          MySwal.fire({
            html: <i>{message}</i>,
            icon: 'success'
          }).then((value) => {
            navigate('/devicepage')
          })
        }})
      .catch(error => console.log('error', error));

    setDevices(prevDevices => [...prevDevices, newDevice]);
    handleCloseDialog();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Device
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Device</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Device Name"
            type="text"
            fullWidth
            value={deviceName}
            onChange={e => setDeviceName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddDevice} disabled={deviceName.trim() === ''}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDevice;
