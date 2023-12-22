import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import * as XLSX from "xlsx";
import Threshold_Similarity_Scores_CSV_FilePath from '../../../../../backend/phase_one/threshold_similarity_scores.csv';
import Similarity_Scores_FilePath from '../../../../../backend/phase_one/similarity_scores.xlsx';

const Overview = () => {
  const [csvData, setCsvData] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const length = 2;

  const handlePrevious = () => {
    const newIndex = currentSlideIndex - 1;
    setCurrentSlideIndex(newIndex < 0 ? length - 1 : newIndex);
  }

  const handleNext = () => {
    const newIndex = currentSlideIndex + 1;
    setCurrentSlideIndex(newIndex >= length ? 0 : newIndex);
  }

  useEffect( () => {

    if (currentSlideIndex == 0) {
      fetch(Threshold_Similarity_Scores_CSV_FilePath)
        .then(response => response.text())
        .then(text => {
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              console.log("Parsed Data:", results.data); 
              setCsvData(results.data); 
              console.log(Threshold_Similarity_Scores_CSV_FilePath)
            },
          });
        }).catch(error => {
          console.error("Fetch error:", error);
        });
      } else {
        console.log("This is similairity scores");
      }
      console.log("Current Slide Index: ", currentSlideIndex);
  }, [currentSlideIndex]);

  return (
    <>
      <table className='min-w-full table-auto border-collapse border border-gray-300'>
        <thead className='bg-gray-100'>
          <tr>
            {currentSlideIndex == 1 ? (
              <>
                <th className='border border-gray-300 px-4 py-2 text-left text-gray-600'>Threashold</th>
                <th className='border border-gray-300 px-4 py-2 text-left text-gray-600'>File Pair's Names</th>
              </>
            ) : (
              <>
              <th className='border border-gray-300 px-4 py-2 text-left text-gray-600'></th>
              <th className='border border-gray-300 px-4 py-2 text-left text-gray-600'></th>
            </>
            )}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="border border-gray-300 px-4 py-2">{row.Threshold}</td>
              <td className="border border-gray-300 px-4 py-2">{row["File Pair's Names"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <p>{currentSlideIndex}</p>
    </>
  );
}

export default Overview;
