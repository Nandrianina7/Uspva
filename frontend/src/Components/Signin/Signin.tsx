import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import useValidEmail from '../Hooks/useValidEmail';

interface IPops {}

type FormData = {
  email: string;
  password: string;
};
const Signin: React.FC<IPops> = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const validEmail = useValidEmail(formData.email);
  const isNotAnEmail = isClicked && (formData.email === '' || !validEmail);
  const isPasswordNull =
    isClicked && (formData.password === '' || formData.password.length < 6);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsClicked(true);
    const validPassword = formData.password.length >= 6;
    if (validEmail && validPassword) {
      console.log(formData);
    } else {
      console.log('Error');
    }
    setFormData({
      email: '',
      password: '',
    });
  };
  const handlePassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width={800}
      height="60vh"
      justifyContent="center"
      alignItems="center"
      gap={1}
      paddingLeft={10}
    >
      <Typography variant="h5" sx={{ mb: 4 }}>
        Signin
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        width="60%"
        component="form"
        gap={1}
      >
        <label>Email</label>
        <TextField
          id="email"
          type="email"
          variant="outlined"
          label="Email"
          value={formData.email}
          onChange={handleInput}
          name="email"
          error={isNotAnEmail}
          helperText={isNotAnEmail && 'Please enter a valid email'}
        />
        <label>Password</label>
        <TextField
          id="pasword"
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleInput}
          error={isPasswordNull}
          helperText={
            isPasswordNull &&
            'Password is required and should contain at least 6 characters'
          }
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide password' : 'show password'
                    }
                    onClick={handlePassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          width: '50%',
          borderRadius: 20,
        }}
        onClick={handleClick}
      >
        Signin
      </Button>
      <Box width="60%" justifyContent="center" alignItems="flex-start">
        <p>Forgot password</p>
      </Box>
    </Box>
  );
};

export default Signin;
