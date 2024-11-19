import { useCallback, useContext } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Typography, Box, Divider } from '@mui/material';
import { useHttp, useNotification } from 'hooks';
import { AuthContext } from 'context';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <Typography sx={{ textTransform: 'uppercase' }}>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const DeleteLinkDialogs = ({ open, setOpen, linkTitle, linkId, getLink }) => {
  const { token } = useContext(AuthContext);
  const showNotification = useNotification();
  const { request } = useHttp();

  const handleRemove = useCallback(
    async id => {
      try {
        const data = await request(`/api/link/${id}`, 'DELETE', null, {
          authorization: `Bearer ${token}`,
        });

        if (data.success) {
          getLink();
          setOpen(false);
          showNotification({ message: data.message, variant: 'success' });
        }
      } catch (error) {
        showNotification(error);
      }
    },
    [getLink, request, showNotification, token]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      fullWidth="sm"
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Delete Link
      </BootstrapDialogTitle>
      <Divider />
      <DialogContent>
        <Box py={4}>
          <Typography gutterBottom>{`Do you really want to delete "${linkTitle}"?`}</Typography>
        </Box>
      </DialogContent>
      <Box p={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="error" autoFocus onClick={() => handleRemove(linkId)}>
          Delete
        </Button>
      </Box>
    </BootstrapDialog>
  );
};
