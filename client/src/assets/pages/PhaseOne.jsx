import React, {useState} from 'react'

import { Box, Typography } from '@mui/material';
import FileUpload from '../containers/FileUpload/FileUpload';
import Overview from '../components/Overview/Overview';

const PhaseOne = () => {

    const [isUploadedSuccessful, setIsUploadSuccessful] = useState(false);

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
                alignItems: 'center',
                flexDirection: 'column',
            }}>
            <FileUpload isUploadedSuccessful={isUploadedSuccessful} setIsUploadSuccessful={setIsUploadSuccessful} />

            {isUploadedSuccessful && (
                <Box 
                    sx={{
                        maxWidth: '65%',
                    }}
                >
                    <Overview areFilesAvailable={isUploadedSuccessful} />
                </Box>
            )}
        </Box>
    </div>
  )
}

export default PhaseOne