import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

interface IPops {}

type FormData = {
  email: string;
  password: string;
};
const Signin: React.FC<IPops> = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
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
    console.log(formData);
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
        />
        <label>Password</label>
        <TextField
          id="pasword"
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleInput}
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
