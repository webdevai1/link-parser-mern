import { Box, Button, Typography } from '@mui/material';
import { LINKS, CREATE } from 'routes';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'context';

export const Header = () => {
  const history = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);
  const logoutHandler = event => {
    event.preventDefault();
    logout();
    history('/');
  };

  const getTitle = () => {
    switch (pathname) {
      case LINKS:
        return 'Link List';
      case CREATE:
        return 'Create Link';
      default:
        return 'Details Links';
    }
  };

  return (
    <Box
      height={60}
      display="flex"
      width="100%"
      bgcolor="#bbbefe"
      style={{ position: 'sticky', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Box>
        <Button
          style={{ marginLeft: 24, fontSize: 18, color: '#fff', fontFamily: 'Helvetica' }}
          onClick={() => history(LINKS)}
        >
          LINKS
        </Button>
        <Button style={{ fontSize: 18, color: '#fff', fontFamily: 'Helvetica' }} onClick={() => history(CREATE)}>
          CREATE
        </Button>
      </Box>
      <Typography
        sx={{ textTransform: 'uppercase', fontWeight: 500, fontSize: 32, fontFamily: 'Helvetica', color: '#fff' }}
      >
        {getTitle()}
      </Typography>
      <Button style={{ marginRight: 24, fontSize: 18, color: '#fff', fontFamily: 'Helvetica' }} onClick={logoutHandler}>
        LOGout
      </Button>
    </Box>
  );
};
