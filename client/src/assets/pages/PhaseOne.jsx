import React from 'react'

import { Box, Typography } from '@mui/material'
import FileUpload from '../components/DropMenu/FileUpload';

const PhaseOne = () => {

    const handleFileUpload = files => {
        console.log('Uploaded files:', files);
      };

  return (
    <div>
        {/* File Dropzone */}
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                paddingBlock: '20px'
            }}>
            <Typography>
                Drag and Drop Files Here
            </Typography>
        </Box>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
            <FileUpload onFileUpload={handleFileUpload}/>
        </Box>
    </div>
  )
}

export default PhaseOne