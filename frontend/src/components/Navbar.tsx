import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import Home from '../page/Home';
import Messages from '../page/Messages';
import About from '../page/About';

const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Navigation' },
  { segment: '/', title: 'Accueil', icon: <DashboardIcon /> },
  { segment: '/messages', title: 'Messages', icon: <MessageIcon /> },
  { segment: '/about', title: 'À propos', icon: <InfoIcon /> },
];

// Créer un thème personnalisé
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme'
  },
  colorSchemes: {
    light: true,
    dark: true
  },
});

const CustomNavigation = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 2 }}>
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginBottom: 1 }}>
      <DashboardIcon sx={{ marginRight: 1 }} />
      <Typography variant="body1">Accueil</Typography>
    </Link>
    <Link to="/messages" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginBottom: 1 }}>
      <MessageIcon sx={{ marginRight: 1 }} />
      <Typography variant="body1">Messages</Typography>
    </Link>
    <Link to="/about" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginBottom: 1 }}>
      <InfoIcon sx={{ marginRight: 1 }} />
      <Typography variant="body1">À propos</Typography>
    </Link>
  </Box>
);

export default function App() {
  return (
    <Router>
      <AppProvider navigation={NAVIGATION} theme={theme}>
        <DashboardLayout>
          <Box sx={{ display: 'flex' }}>
            <CustomNavigation />
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              {/* Routes définies ici */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h4">Page non trouvée</Typography>
                  </Box>
                } />
              </Routes>
            </Box>
          </Box>
        </DashboardLayout>
      </AppProvider>
    </Router>
  );
}
