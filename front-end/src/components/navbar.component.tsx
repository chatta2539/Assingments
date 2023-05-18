import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Navbar() {
  const navigate = useNavigate()
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })

  function SignOut(): void {
    swalWithBootstrapButtons.fire({
      title: 'Logout?',
      text: `Are you sure you want to Logout from Wonderful application ;)`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I do',
      cancelButtonText: 'No, Stay login',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'LOGOUT!',
          `Your devicehas been deleted.`,
          'success'
        )
        navigate('/')
        localStorage.setItem('token', "")
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Stay login :)',
          'success'
        )
      }
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chettha Narohim
          </Typography>
          <Button color="inherit" onClick={() => {
            SignOut()

          }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}