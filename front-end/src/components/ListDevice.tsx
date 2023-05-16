import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

interface DeviceData {
  id: number;
  deviceName: string;
}

const ListDevice: React.FC = () => {
  const [data, setData] = useState<DeviceData[]>([
    { id: 1, deviceName: "Device 1" },
    { id: 2, deviceName: "Device 2" },
    { id: 3, deviceName: "Device 3" },
  ]);
  const [open, setOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<DeviceData | null>(null);
  const [newDeviceName, setNewDeviceName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDevice(null);
    setNewDeviceName("");
  };

  const handleAddDevice = () => {
    const newDevice: DeviceData = {
      id: data.length + 1,
      deviceName: newDeviceName,
    };
    setData([...data, newDevice]);
    handleClose();
  };

  const handleEditDevice = () => {
    if (editingDevice) {
      const updatedData = data.map((device) =>
        device.id === editingDevice.id
          ? { ...device, deviceName: newDeviceName }
          : device
      );
      setData(updatedData);
      handleClose();
    }
  };

  const handleDeleteDevice = (id: number) => {
    const updatedData = data.filter((device) => device.id !== id);
    setData(updatedData);
  };

  const handleEditButtonClick = (device: DeviceData) => {
    setEditingDevice(device);
    setNewDeviceName(device.deviceName);
    handleOpen();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
      }}
    >
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Device Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.deviceName}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditButtonClick(row)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteDevice(row.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editingDevice ? "Edit Device" : "Add Device"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Device Name"
              type="text"
              fullWidth
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={editingDevice ? handleEditDevice : handleAddDevice}
              color="primary"
            >
              {editingDevice ? "Save Changes" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Button variant="contained" color="primary" sx={{ width: "75%" }}>
          Log In
        </Button> */}
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default ListDevice;
