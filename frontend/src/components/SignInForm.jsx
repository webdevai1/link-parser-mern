import { useForm } from 'react-hook-form';

import { Box, Typography, TextField, Button } from '@mui/material';
import { useHttp, useNotification } from '../hooks';
import { useContext } from 'react';
import { AuthContext } from 'context';

export const SignInForm = () => {
  const showNotification = useNotification();
  const { request, error } = useHttp();
  const { register, handleSubmit } = useForm();
  const auth = useContext(AuthContext);
  const handlerSignIn = async ({ email, password }) => {
    try {
      const data = await request('/api/auth/login', 'POST', {
        email: email,
        password: password,
      });
      showNotification({
        message: data.message,
      });
      if (data.token && data.userId) {
        auth.login(data.token, data.userId);
      }
    } catch (e) {
      showNotification({
        message: error,
      });
    }
  };

  const onSubmit = data => {
    handlerSignIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mt={8} px={2} width={400}>
        <TextField
          required
          label="Email"
          variant="standard"
          type="email"
          fullWidth
          {...register('email', { require: true })}
        />
      </Box>
      <Box mt={4} px={2}>
        <TextField
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          fullWidth
          {...register('password', { require: true, min: 8 })}
        />
      </Box>
      <Box mt={1} px={2}>
        <Typography variant="body2"> Forgot password?</Typography>
      </Box>
      <Box mt={4} px={2}>
        <Button
          style={{
            background: '#bbbefe',
            color: '#fff',
            marginRight: 8,
            border: 0,
          }}
          type="submit"
          variant="contained"
        >
          Sign in
        </Button>
      </Box>
    </form>
  );
};
