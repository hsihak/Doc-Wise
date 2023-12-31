import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import FileUploadForm from '../../components/FileUploadForm/FileUploadForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import DropzoneComponent from '../../components/DropZoneComponent/DropzoneComponent';
import FileList from '../../components/FileList/FileList';

export default function FileUpload(props) {
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileToDelete, setFileToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const acceptedFileTypes = {
        'application/pdf': ['.pdf'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        'application/msword': ['.doc']
      };

    const handleFileUpload = (files) => {
        // Convert the files object to an array
        const filesArray = Array.from(files);
      
        // Filter out files that are not of the accepted types
        const validFiles = filesArray.filter(file => {
          const fileType = file.type;
          const fileExtension = file.name.split('.').pop();
          return acceptedFileTypes[fileType] && acceptedFileTypes[fileType].includes(`.${fileExtension}`);
        });
      
        if (validFiles.length !== filesArray.length) {
          setErrorMessage('Invalid file format. Please upload only PDF, DOCX, or DOC files.');
        }
        setUploadedFiles(prevFiles => [...prevFiles, ...validFiles]);
      };

    const handleFileDelete = (file) => {
        setFileToDelete(file);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = (file) => {
        setFiles(files.filter(f => f !== file));
        setIsDeleteModalOpen(false);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
    };

    return (
        <Box>
            <DropzoneComponent onDrop={handleFileUpload} />
            <FileList files={files} onFileDelete={handleFileDelete} />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <FileUploadForm onSubmit={handleSubmit} isSubmitting={isSubmitting} canCompareSimilarities={files.length >= 2} />
            <DeleteConfirmationModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} fileToDelete={fileToDelete} />
        </Box>
    );
}
