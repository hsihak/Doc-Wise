import React from 'react';
import { Typography, Box } from '@mui/material';

function ErrorMessage({ message }) {
    return (
        <Box
            sx={{
            padding: '30px',
            textAlign: 'center',
            }}
        >
            <Typography sx={{ color: 'red' }}>
            Please select at least two documents in order to compare their similarities.
            </Typography>
            <Typography sx={{ color: 'red' }}>
            You can select as many files as you want.
            </Typography>
      </Box>
    );
}

export default ErrorMessage;
