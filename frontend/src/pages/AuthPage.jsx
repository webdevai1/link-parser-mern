import { useState } from 'react';
import { Box, Tab } from '@mui/material';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { MainLayout } from 'layouts';
import { SignUpForm, SignInForm } from 'components';

export const AuthPage = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <MainLayout
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        maxWidth={500}
        mixWidth={400}
        minHeight={500}
        sx={{
          background: '#fff',
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Sign In" value="1" />
              <Tab label="Sign Up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SignInForm />
          </TabPanel>
          <TabPanel value="2">
            <SignUpForm />
          </TabPanel>
        </TabContext>
      </Box>
    </MainLayout>
  );
};
