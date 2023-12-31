import React from 'react';
import { Button } from '@mui/material';

function FileUploadForm({ onSubmit, isSubmitting, canCompareSimilarities }) {
    return (
        <div>
            <Button onClick={onSubmit} disabled={!canCompareSimilarities || isSubmitting}>
                {isSubmitting ? 'Uploading...' : 'Upload Files'}
            </Button>
        </div>
    );
}

export default FileUploadForm;