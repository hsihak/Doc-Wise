import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { IoChevronBackCircle } from "react-icons/io5"
import { Box, Button, Typography } from '@mui/material';

const Overview = ({ areFilesAvailable }) => {
  const [data, setData] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const length = 2;

  const Threshold_Similarity_Scores_CSV_FilePath = '/src/assets/storage/phase-one/static/threshold_similarity_scores.csv';
  const Similarity_Scores_XLSX_FilePath = '/src/assets/storage/phase-one/static/similarity_scores.xlsx';

  const handlePrevious = () => {
    const newIndex = currentSlideIndex - 1;
    setCurrentSlideIndex(newIndex < 0 ? length - 1 : newIndex);
  }

  const handleNext = () => {
    const newIndex = currentSlideIndex + 1;
    setCurrentSlideIndex(newIndex >= length ? 0 : newIndex);
  }

  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {

    if (!areFilesAvailable) {
      console.log("Files are not yet available.");
      return;
    }

    if (currentSlideIndex === 0) {
      // Fetch and parse CSV data
      fetch(Threshold_Similarity_Scores_CSV_FilePath)
        .then(response => response.text())
        .then(text => {
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              setData(results.data);
            },
          });
        })
        .catch(error => console.error("Fetch error:", error));
    } else if (currentSlideIndex === 1) {
      // Fetch and parse Excel data
      fetch(Similarity_Scores_XLSX_FilePath)
        .then(response => response.blob())
        .then(blob => readExcelFile(blob))
        .catch(error => console.error("Fetch error:", error));
    }
  }, [currentSlideIndex, areFilesAvailable]);

  const renderTableHeaders = () => {
    if (data.length > 0) {
      const columnNames = Object.keys(data[0]);
      return columnNames.map((key, index) => (
        <th key={index} className='border border-gray-300 px-4 py-2 text-left text-gray-600'>
          {key || <span className='text-center'>—</span>} {/* Render a dash if the key is empty */}
        </th>
      ));
    }
    return null;
  };

  const renderTableRows = () => {
    return data.map((row, index) => (
      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
        {Object.values(row).map((value, idx) => (
          <td key={idx} className="border border-gray-300 px-4 py-2 text-center">
            {value !== undefined && value !== null ? value : '—'} {/* Render a dash if the value is empty */}
          </td>
        ))}
      </tr>
    ));
  };
  
  

  return (
    <div className='w-full'>
          <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60vw',
                margin: 'auto'
              }}>
              <Typography variant='h4'
                sx={{
                  paddingBlock: '1rem',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {currentSlideIndex === 0 ? 'Overview of Threshold Similarity Scores' : 'Overview of Similarity Scores'}
              </Typography>
            </Box>
      <div className="flex items-center">
        <IoChevronBackCircle onClick={handlePrevious} className='cursor-pointer text-2xl text-blue-500 flex-shrink-0' style={{ flexBasis: '2.5vw' }}/>
        <div className='flex overflow-auto border-4 border-black rounded-xl'>
          <div className='rounded-xl'> 
            <table className='w-[60vw] table-auto border-collapse border border-gray-300 relative'>
              <thead className='bg-gray-100'>
                <tr>
                  {renderTableHeaders()}
                </tr>
              </thead>
              <tbody>
                {renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      {/* <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button> */}
      <IoChevronBackCircle onClick={handleNext} className='cursor-pointer text-2xl text-blue-500 rotate-180 flex-shrink-0' style={{ flexBasis: '2.5vw' }}/>
      </div>
    </div>
  );
}

export default Overview;
