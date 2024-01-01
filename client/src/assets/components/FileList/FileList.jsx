import React from 'react';
import { Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function FileList({ uploadedFiles, openFileDeleteConfirmation }) {
    return (
        <Box>
            <ul>
                {uploadedFiles.map((file, index) => (
                    <Box 
                        key={`${file.path}-${index}`}
                        sx={{
                            marginBlock: '10px',
                        }}
                        >
                        <li>
                            <Box
                            sx={{
                                background: '#F5F5F5',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingInline: '2px',
                                borderRadius: '10px',
                                border: '1px solid #707070',
                            }}
                            >
                            {file.path}
                            <IconButton onClick={() => openFileDeleteConfirmation(file)}>
                                <ClearIcon />
                            </IconButton>
                            </Box>
                        </li>
                    </Box>
                ))}
            </ul>
        </Box>
    );
}

export default FileList;