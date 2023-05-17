import React, { useState, useEffect } from "react";
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
import AddDevice from "../components/adddevice.compoment";
import { DeviceProps } from "../interfaces/DeviceProps";
import { api_end_point } from "../utils/EndPoint";
// interface DeviceProps {
//   id: string;
//   devicename: string;
// }

const ListDevice: React.FC = () => {
  const [devices, setDevices] = useState<DeviceProps[]>([]);
  const [data, setData] = useState<DeviceProps[]>([]);
  const [open, setOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<DeviceProps | null>(null);
  const [newDeviceName, setNewDeviceName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow' as RequestRedirect
    };

    fetch( api_end_point + "/api/device", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        const resultJson = JSON.parse(result)
        setData(resultJson.alldevice)
      })
      .catch(error => console.log('error', error));

  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDevice(null);
    setNewDeviceName("");
  };

  const handleAddDevice = () => {
    // const newDevice: DeviceProps = {
    //   devicename: newDeviceName,
    // };
    // setData([...data, newDevice]);
    handleClose();
  };

  const handleEditDevice = () => {
    if (editingDevice) {
      const updatedData = data.map((device) =>

        device.devicename === editingDevice.devicename
          ? { ...device, deviceName: newDeviceName }
          : device
      );

      // console.log(updatedData.alldevice)
      setData(updatedData);
      handleClose();
    }
  };

  const handleDeleteDevice = (devicename: string) => {
    const updatedData = data.filter((device) => device.devicename !== devicename);
    setData(updatedData);
  };

  const handleEditButtonClick = (device: DeviceProps) => {
    setEditingDevice(device);
    setNewDeviceName(device.devicename);
    handleOpen();
  };

  return (
    <div >
      <AddDevice devices={devices} setDevices={setDevices} />
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Device Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.devicename}>
                  {/* <TableCell>{row.devicename}</TableCell> */}
                  <TableCell>{row.devicename}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditButtonClick(row)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteDevice(row.devicename)}>
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
      </div>
    </div>
  );
};

export default ListDevice;
