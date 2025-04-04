import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4">Bienvenue sur la page d'accueil</Typography>
    </Box>
  );
}
