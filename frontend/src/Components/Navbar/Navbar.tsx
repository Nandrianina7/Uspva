import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Sidebar from '../Sidebar/Sidebar';

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);
  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">USVPA CAMPUS</Typography>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} onClose={toggleDrawer} />
    </>
  );
}
export default Navbar;
