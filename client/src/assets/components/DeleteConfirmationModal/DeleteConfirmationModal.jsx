import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '10px'
    };

function DeleteConfirmationModal({ open, onClose, onConfirm, fileToDelete }) {
    return (
        <Modal 
            open={open} 
            onClose={onClose}
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
                        Are you sure you want to delete
                        <span className="block">
                            <span className="underline text-center font-semibold">
                                {fileToDelete ? fileToDelete.path : ''}
                            </span>
                            <span> ?</span>
                        </span>
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
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                            background: '#93C448',
                            color: 'white',
                            '&:hover': {
                                background: '#D3D9CE',
                            },
                            }}
                            onClick={() => onConfirm(fileToDelete)}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteConfirmationModal;
