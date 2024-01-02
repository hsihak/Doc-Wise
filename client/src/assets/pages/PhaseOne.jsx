import React, {useState} from 'react'

import { Box, Typography } from '@mui/material';
import FileUpload from '../containers/phase-one/FileUpload/FileUpload';
import Overview from '../components/Overview/Overview';
import DownloadResultFiles from '../components/DownloadResultFiles/DownloadResultFiles';

const PhaseOne = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUploadedSuccessful, setIsUploadSuccessful] = useState(false);

    const handleFileUpload = files => {
        console.log('Uploaded files:', files);
      };

      console.log('This is the file paths: ', uploadedFiles);

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
            <FileUpload 
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                isUploadedSuccessful={isUploadedSuccessful} 
                setIsUploadSuccessful={setIsUploadSuccessful} />

            {isUploadedSuccessful && (
                <>
                    <Box 
                        sx={{
                            maxWidth: '65%',
                        }}
                    >
                        <Overview areFilesAvailable={isUploadedSuccessful} />
                    </Box>
                
                    <Box>
                        <DownloadResultFiles filesPathName={uploadedFiles}/>
                    </Box>
                </>

            )}
        </Box>
    </div>
  )
}

export default PhaseOne