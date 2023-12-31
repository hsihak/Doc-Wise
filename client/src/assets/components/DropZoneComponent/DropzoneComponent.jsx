import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button } from '@mui/material';

function DropzoneComponent({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

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

  return (
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
          <img src="src/assets/Drag-And-Drop.svg" alt="Drag-And-Drop-Image" width="100px" />
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
          <p>Formats supported: DOCX and PDF</p>
        </Box>
      )}
    </div>
  );
}

export default DropzoneComponent;
