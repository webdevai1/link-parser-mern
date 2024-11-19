import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useCallback(
    ({ message, error, variant = 'error' }) => {
      if (error) {
        enqueueSnackbar(error, {
          variant: 'error',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          preventDuplicate: true,
        });
      }
      if (message) {
        enqueueSnackbar(message, {
          variant,
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          preventDuplicate: true,
        });
      }
    },
    [enqueueSnackbar]
  );
};
