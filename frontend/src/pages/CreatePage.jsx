import { Box, Input, Button } from '@mui/material';
import { AuthContext } from 'context';
import { useHttp, useNotification } from 'hooks';
import { MainLayout } from 'layouts';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DETAILS } from 'routes';

export const CreatePage = () => {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { register, handleSubmit } = useForm();
  const history = useNavigate();
  const [loading, setLoading] = useState(false);

  const showNotification = useNotification();
  const handlerAddLink = async link => {
    try {
      setLoading(true);
      const data = await request(
        '/api/link/generate',
        'POST',
        { from: link },
        {
          authorization: `Bearer ${token}`,
        }
      );
      if (!!data?.link) {
        history(`${DETAILS}/${data.link._id}`);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      showNotification(error);
    }
  };

  const onSubmit = data => {
    handlerAddLink(data?.link);
  };
  return (
    <MainLayout loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pt={4} display="flex" justifyContent="center" alignItems="center">
          <Input
            required
            placeholder="Add link"
            variant="standard"
            fullWidth
            style={{ maxWidth: 500 }}
            {...register('link', { require: true })}
          />
          <Button
            style={{
              background: '#bbbefe',
              color: '#fff',
              marginLeft: 8,
              border: 0,
              height: 30,
            }}
            type="submit"
            variant="contained"
          >
            Send
          </Button>
        </Box>
      </form>
    </MainLayout>
  );
};
