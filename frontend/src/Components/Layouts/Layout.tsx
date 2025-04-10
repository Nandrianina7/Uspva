import { Box } from '@mui/material';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';

interface IProps {}

const Layout: React.FC<IProps> = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '70%', minHeight: '100vh' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
