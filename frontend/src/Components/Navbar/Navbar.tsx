// src/components/Navbar/Navbar.tsx
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { Menu, DarkMode, LightMode } from '@mui/icons-material';
import Sidebar from '../Sidebar/Sidebar';
import { useColorMode } from '../../Theme/ColorModeProvider/ColorModeProvider';

function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            USVPA CAMPUS
          </Typography>
          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} onClose={toggleDrawer} />
    </>
  );
}
export default Navbar;
