import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileUploadForm from '../../components/FileUploadForm/FileUploadForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import FileList from '../../components/FileList/FileList';
import { Box, Button, Typography } from '@mui/material';
import Spinner from '../../components/Spinner/Spinner';

export default function FileUpload(props) {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const acceptedFileTypes = {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    };

    const canCompareSimilarities = uploadedFiles.length >= 2;
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

    console.log('Is Drag Active:', isDragActive);

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
    
            const response = await axios.post('http://127.0.0.1:5000/upload', formData);
      
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
                maxHeight: '200px', // Set the maximum height for the container
                overflow: 'auto',
                paddingInline: '30px'
          }}>
          <FileList uploadedFiles={uploadedFiles} openFileDeleteConfirmation={openFileDeleteConfirmation} />
          </Box>
        </Box>

        {/* Compare Similarities Button */}
        <div className='grid grid-cols-3 mt-5 w-2/4'>
          <div className=' col-span-1/2 place-self-center'>
            <Spinner isSubmitting={isSubmitting}/>
          </div>
          <div className=' col-span-1'>
            <FileUploadForm onSubmit={handleSubmit} isSubmitting={isSubmitting} canCompareSimilarities={canCompareSimilarities} />
          </div>
        </div>

        {errorMessage && (<Typography sx={{ color: 'red', marginTop: '10px' }}>{errorMessage}</Typography>)}
        {isAtLeastOneFileUploaded && <ErrorMessage/>}
        <DeleteConfirmationModal open={deleteConfirmationOpen} onClose={closeFileDeleteConfirmation} onConfirm={confirmDelete} fileToDelete={fileToDelete} />
    </Box>
  );
}