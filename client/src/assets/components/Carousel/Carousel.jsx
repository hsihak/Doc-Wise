import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import Carousel from './Carousel'; // Adjust the import path as needed
import Threshold_Similarity_Scores_CSV_FilePath from '../../../../../backend/phase_one/threshold_similarity_scores.csv';
import Similarity_Scores_FilePath from '../../../../../backend/phase_one/similarity_scores.xlsx';

const Overview = () => {
  const [csvData, setCsvData] = useState([]);
  const [xlsxData, setXlsxData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (currentSlide === 0) {
      fetch(Threshold_Similarity_Scores_CSV_FilePath)
        .then(response => response.text())
        .then(text => {
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              setCsvData(results.data);
            },
          });
        }).catch(error => {
          console.error("Fetch error:", error);
        });
    } else {
      fetch(Similarity_Scores_FilePath)
        .then(response => response.arrayBuffer())
        .then(buffer => {
          const workbook = XLSX.read(buffer, { type: 'buffer' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          setXlsxData(data);
        }).catch(error => {
          console.error("Fetch error:", error);
        });
    }
  }, [currentSlide]);

  const renderTable = (data) => (
    <table className='min-w-full table-auto border-collapse border border-gray-300'>
      <thead className='bg-gray-100'>
        <tr>
          <th className='border border-gray-300 px-4 py-2 text-left text-gray-600'>Threashold</th>
          <th className='border border-gray-300 px-4 py-2 text-left text-gray-600'>File Pair's Names</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <td className="border border-gray-300 px-4 py-2">{row.Threshold || row.YourXLSXColumnName1}</td>
            <td className="border border-gray-300 px-4 py-2">{row["File Pair's Names"] || row.YourXLSXColumnName2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <Carousel autoSlide={true} autoSlideInterval={3000}>
        <div>{renderTable(csvData)}</div>
        <div>{renderTable(xlsxData)}</div>
      </Carousel>
    </div>
  );
}

export default Overview;
