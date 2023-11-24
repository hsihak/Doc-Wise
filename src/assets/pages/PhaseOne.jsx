import React from 'react'
import { Header } from '../components/Header/Header'
import SubHeader from '../components/Header/SubHeader'
import FileUpload from '../components/DropMenu/FileUpload'
import { Box, Typography } from '@mui/material'

const PhaseOne = () => {

    const handleFileUpload = files => {
        // Handle file upload logic here
        console.log('Uploaded files:', files);
      };

  return (
    <div>
        <Header/>
        {/* Sub header */}
        <SubHeader/>
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