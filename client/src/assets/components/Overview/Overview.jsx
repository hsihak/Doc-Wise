import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { IoChevronBackCircle } from "react-icons/io5"

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
      if (columnNames.length === 0) {
        // If there are no column names, create a placeholder
        return <th className='border border-gray-300 px-4 py-2 text-left text-gray-600'>Column 1</th>;
      }
      return Object.keys(data[0]).map((key, index) => (
        <th key={index} className='border border-gray-300 px-4 py-2 text-left text-gray-600'>
          {key}
        </th>
      ));
    }
    return null;
  };

  const renderTableRows = () => {
    return data.map((row, index) => (
      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
        {Object.values(row).map((value, idx) => (
          <td key={idx} className="border border-gray-300 px-4 py-2">
            {value}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <>
      <div className="overflow-x-auto flex relative">
        <IoChevronBackCircle onClick={handlePrevious} className='cursor-pointer flex absolute bottom-1/2'/>
        <table className='min-w-full table-auto border-collapse border border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              {renderTableHeaders()}
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
        <IoChevronBackCircle onClick={handlePrevious} className='cursor-pointer flex flex-row-reverse absolute bottom-1/2 right-3/4'/>
      </div>
      {/* <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button> */}
      <p>{currentSlideIndex}</p>
    </>
  );
}

export default Overview;
