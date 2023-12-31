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
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <Typography>Are you sure you want to delete this file?</Typography>
                <Typography>{fileToDelete ? fileToDelete.name : ''}</Typography>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => onConfirm(fileToDelete)}>Delete</Button>
            </Box>
        </Modal>
    );
}

export default DeleteConfirmationModal;
