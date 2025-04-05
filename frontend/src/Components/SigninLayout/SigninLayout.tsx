import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Signin from '../Signin/Signin';
import './style.css';
interface IPops {}

const Hrline = (width: any) => {
  return (
    <Box
      sx={{
        width: width,
        height: 4,
        bgcolor: 'white',
        mx: 'auto',
        mb: 4,
        borderRadius: 2,
      }}
    />
  );
};

const SigninLAyout: React.FC<IPops> = () => {
  const theme = useTheme();
  const isWidthMin900 = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div
      className="container"
      style={{
        flexDirection: isWidthMin900 ? 'column' : 'row',
      }}
    >
      <Signin />
      <Box
        className="second-flex"
        sx={{
          backgroundColor: theme.palette.primary.main,
          display: isWidthMin900 ? 'none' : 'flex',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              background:
                'linear-gradient(to right,rgb(107, 187, 110), #FFFFFF,rgb(238, 107, 151))',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
              mb: 7,
            }}
          >
            USPVA CAMPUS
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: '80%',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Discover excellence in education and innovation at our prestigious
            institution
          </Typography>
          <Hrline width={100} />
          <Typography variant="h3" sx={{ mb: 4, fontFamily: 'italic' }}>
            Univerité Saint Vincent de Paul AKAMASOA
          </Typography>
          <Hrline width={300} />
          <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4 }}
          >
            {[
              { icon: '🎓', text: 'Quality Education' },
              { icon: '🔬', text: 'Research' },
              { icon: '🌍', text: 'Global Community' },
            ].map((item, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {item.icon}
                </Typography>
                <Typography variant="subtitle1">{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default SigninLAyout;
