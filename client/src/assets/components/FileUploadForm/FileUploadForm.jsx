import React from 'react';
import { Button } from '@mui/material';

function FileUploadForm({ onSubmit, isSubmitting, canCompareSimilarities }) {
    return (
        <div className='flex items-center justify-center'>
            <Button 
                sx={{
                    background: '#8AC62D',
                    color: '#ffffff',
                    "&:hover": {
                        background: '#8fd424',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    "&.Mui-disabled": {
                        background: '#e8e8e8',
                        color: '#ffffff',
                    },
                    marginBlock: '10px',
                    width: '80%'
                }}
                onClick={onSubmit} 
                disabled={!canCompareSimilarities || isSubmitting}>
                {isSubmitting ? 'Process...' : 'Compare Similarities'}
            </Button>
        </div>
    );
}

export default FileUploadForm;