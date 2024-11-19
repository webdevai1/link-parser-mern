import React from 'react';
import { SnackbarProvider } from 'notistack';

export const SnackBar = ({ children, classes }) => (
  <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
    {children}
  </SnackbarProvider>
);
