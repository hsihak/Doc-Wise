import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, IconButton, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Modal from '@mui/material/Modal';
import axios from "axios";

export default function FileUpload(props) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    onDrop: (files) => handleFileUpload(files),
  });

  const handleFileUpload = (files) => {
    // Convert the files object to an array
    const filesArray = Array.from(files);
  
    // Filter out files that are not of the accepted types
    const validFiles = filesArray.filter(file => acceptedFileTypes.includes(file.type));
  
    if (validFiles.length !== filesArray.length) {
      // Set error message for invalid files
      setErrorMessage('Invalid file format. Please upload only PDF or DOCX files.');
    }
  
    // Update the state only with valid files
    setUploadedFiles([...uploadedFiles, ...validFiles]);
  };
  
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append('files[]', uploadedFiles[i]);
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData);

      if (response.status === 201) {
        setResponseMsg({
          status: response.data.status,
          message: response.data.message,
        });

        setTimeout(() => {
          setUploadedFiles([]);
          setResponseMsg('');
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
    }}

  const openDeleteConfirmation = (file) => {
    setFileToDelete(file);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setFileToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      removeFile(fileToDelete);
      closeDeleteConfirmation();
    }
  };

  const removeFile = (file) => {
    const updatedFiles = uploadedFiles.filter((uploadedFile) => uploadedFile !== file);
    setUploadedFiles(updatedFiles);
  };

  const canCompareSimilarities = uploadedFiles.length >= 2;
  const isAtLeastOneFileUploaded = uploadedFiles.length === 1;

  const filesList = uploadedFiles.map((file, index) => (
    <Box
      key={`${file.path}-${index}`} // Ensure unique key by appending index
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
          <IconButton onClick={() => openDeleteConfirmation(file)}>
            <ClearIcon />
          </IconButton>
        </Box>
      </li>
    </Box>
  ));
  

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
            <p>Drop the files here ...</p>
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
            <p>Or</p>
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
            <p>Formats supported: docx and PDF</p>
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
        <ul>{filesList}</ul>
        </Box>
      </Box>

      {errorMessage && (
        <Typography sx={{ color: 'red', marginTop: '10px' }}>{errorMessage}</Typography>
      )}

      {canCompareSimilarities && (
        <Button
          variant="contained"
          sx={{
            background: '#416E71',
            color: 'white',
            border: '2px solid black',
            marginTop: '30px',
            '&:hover': {
              background: '#D3D9CE',
            },
          }}
          onClick={submitHandler}
        >
          Compare Similarities
        </Button>
      )}

      {isAtLeastOneFileUploaded && (
        <Box
          sx={{
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ color: 'red' }}>
            Please select at least two documents in order to compare their similarities.
          </Typography>
          <Typography sx={{ color: 'red' }}>
            You can select as many files as you want.
          </Typography>
        </Box>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteConfirmationOpen}
        onClose={closeDeleteConfirmation}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <Box sx={modalStyles}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
            }}
          >
            <Typography sx={{ textAlign: 'center' }}>
              Are you sure you want to delete{' '}
              <span className="underline block text-center">
                {fileToDelete ? fileToDelete.path : ''}
              </span>
              ?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background: '#ffffff',
                  color: 'black',
                  border: '1px solid black',
                  '&:hover': {
                    background: '#D3D9CE',
                  },
                }}
                onClick={closeDeleteConfirmation}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: '#416E71',
                  color: 'white',
                  border: '1px solid black',
                  '&:hover': {
                    background: '#D3D9CE',
                  },
                }}
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
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
    width: '80%', // Adjust the width for smaller screens
    height: '150px', // Adjust the height for smaller screens
  },
};


const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  };
 
