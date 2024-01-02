import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import FileUploadForm from '../../../components/FileUploadForm/FileUploadForm';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import FileList from '../../../components/FileList/FileList';
import { Box, Button, Typography } from '@mui/material';
import Spinner from '../../../components/Spinner/Spinner';
import axios from 'axios';

export default function FileUpload({ uploadedFiles, setUploadedFiles, isUploadedSuccessful , setIsUploadSuccessful}) {
    const [fileToDelete, setFileToDelete] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [responseMsg, setResponseMsg] = useState('');

    const acceptedFileTypes = {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    };

    console.log('response message: ', responseMsg);
    const canPerformAction = uploadedFiles.length >= 2;
    const isAtLeastOneFileUploaded = uploadedFiles.length === 1;

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      open
    } = useDropzone({
      noClick: true,
      noKeyboard: true,
      accept: acceptedFileTypes,
      onDrop: (acceptedFiles, fileRejections) => handleFileUpload(acceptedFiles, fileRejections),
    });

    useEffect(() => {
      if (isUploadedSuccessful) {
          console.log('Files have been uploaded successfully.');
      }
  }, [isUploadedSuccessful]);

    
    const handleFileUpload = (acceptedFiles, fileRejections) => {
      // Process accepted files
      const newFiles = acceptedFiles.filter(file => !uploadedFiles.some(uploadedFile => uploadedFile.name === file.name));
      setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      // Handle file rejections
      if (fileRejections.length > 0) {
        const rejectedFilesMessage = fileRejections.map(({ file }) => file.name).join(', ');
        setErrorMessage(`Invalid file format for: ${rejectedFilesMessage}`);
      } else {
        setErrorMessage('');
      }
    };
    
    const openFileDeleteConfirmation = (file) => {
      setFileToDelete(file);
      setDeleteConfirmationOpen(true);
    };
    
    const closeFileDeleteConfirmation = () => {
      setFileToDelete(null);
      setDeleteConfirmationOpen(false);
    };
    
    console.log(uploadedFiles)
    
    const confirmDelete = () => {
      if (fileToDelete) {
        removeFile(fileToDelete);
        closeFileDeleteConfirmation();
      }
    };
    
    const removeFile = (file) => {
      const updatedFiles = uploadedFiles.filter((uploadedFile) => uploadedFile !== file);
      setUploadedFiles(updatedFiles);
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      setIsSubmitting(true);
      
      setTimeout(async () => {
        
        
        try {
          const formData = new FormData();
          
          for (let i = 0; i < uploadedFiles.length; i++) {
            console.log(`Uploading file: ${uploadedFiles[i].name}, Size: ${uploadedFiles[i].size}`);
            formData.append('file', uploadedFiles[i]);
          }
          
          console.log(formData)
          
          const response = await axios.post('http://127.0.0.1:5000/phase-one/upload', formData);
          
          if (response.status === 201) {
            setResponseMsg({
              status: response.data.status,
              message: response.data.message,
            });
            
            setTimeout(() => {
              // setUploadedFiles([]);
              setResponseMsg('');
              setIsUploadSuccessful(true);
            }, 5000); // Clear after 5 seconds
            
            alert('Successfully Uploaded');
          }
        } catch (error) {
          console.error(error);
          if (error.response) {
            console.log(error.response);
            if (error.response.status === 401) {
              alert('Invalid credentials');
            }
          }
        }
        
        
        setIsSubmitting(false); // Hide spinner after processing
      }, 3000);
    };
    
    console.log(errorMessage);
    
    return (
      <Box
      className="container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
        >
        <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyles}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <Typography>Drop the files here ...</Typography>
            </Box>
          ) : (
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
              <img src="src\assets\Drag-And-Drop.svg" alt="Drag-And-Drop-Image" width="100px" />
              <Typography>Or</Typography>
              <Button
                variant="contained"
                sx={{
                  background: '#D3D9CE',
                  color: 'black',
                  border: '2px solid black',
                  '&:hover': {
                    background: '#D3D9CE',
                  },
                }}
                onClick={open}
                >
                Browse File
              </Button>
              <Typography>Formats supported: docx and PDF</Typography>
            </Box>
          )}
        </div>

        <Box
          sx={{
            marginTop: '20px',
            width: '30%',
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
          }}
          >
          <h4>Files uploaded:</h4>
          <Box
            sx={{
              maxHeight: '200px',
              overflow: 'auto',
              paddingInline: '30px'
            }}>
            <FileList uploadedFiles={uploadedFiles} openFileDeleteConfirmation={openFileDeleteConfirmation} />
          </Box>
        </Box>
        {/* Reserved Space for "Please refer to the bottom of the page to download the full result" message */}
        <Box
        sx={{
          marginTop: '20px',
          height: isUploadedSuccessful ? 'auto' : '20px', 
          width: '100%', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center', 
        }}
      >
        {isUploadedSuccessful && (
          <Typography variant='h6'>
            Please refer to the bottom of the page to download the full result
          </Typography>
        )}
      </Box>

        {/* Compare Similarities Button */}
        <div className='grid grid-cols-3 mt-5 w-2/4'>
          <div className=' col-span-1/2 place-self-center'>
            <Spinner isSubmitting={isSubmitting}/>
          </div>
          <div className=' col-span-1'>
            <FileUploadForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
              canPerformAction={canPerformAction} 
              actionType="compare"
            />
          </div>
        </div>

        {errorMessage && (<Typography sx={{ color: 'red', marginTop: '10px' }}>{errorMessage}</Typography>)}
        {isAtLeastOneFileUploaded && <ErrorMessage/>}
        <DeleteConfirmationModal open={deleteConfirmationOpen} onClose={closeFileDeleteConfirmation} onConfirm={confirmDelete} fileToDelete={fileToDelete} />
    </Box>
  );
}

const dropzoneStyles = {
  width: '30%',
  height: '250px',
  padding: '20px',
  borderWidth: '4px',
  borderRadius: '4px',
  borderStyle: 'dashed',
  borderColor: 'black',
  backgroundColor: '#fafafa',
  color: 'black',
  outline: 'none',
  transition: 'border .24s ease-in-out',

  // Material-UI responsive styles
  '@media screen and (minWidth: 200px) and (maxWidth: 767px)': {
    width: '80%', 
    height: '150px', 
  },
};