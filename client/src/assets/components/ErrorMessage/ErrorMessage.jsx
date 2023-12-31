import React from 'react';
import { Typography } from '@mui/material';

function ErrorMessage({ message }) {
    return (
        <Typography sx={{ color: 'red', marginTop: '10px' }}>
            {message}
        </Typography>
    );
}

export default ErrorMessage;
