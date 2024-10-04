import React from 'react';
import { CircularProgress, Stack } from '@mui/material';

const LoadingContainer = ({ children, loading }) => {
  return (
    <>
      {loading ? (
        <Stack alignItems={'center'} pt={20}>
          <CircularProgress sx={{ color: 'blue', textAlign: 'center' }} />
        </Stack>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingContainer;
