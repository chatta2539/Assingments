import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface Device {
  id: number;
  deviceName: string;
}

interface DeviceListProps {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

const AddDevice: React.FC<DeviceListProps> = ({ devices, setDevices }) => {
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

    const newDevice: Device = {
      id: devices.length + 1,
      deviceName: deviceName.trim(),
    };

    setDevices(prevDevices => [...prevDevices, newDevice]);
    handleCloseDialog();
  };

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
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
