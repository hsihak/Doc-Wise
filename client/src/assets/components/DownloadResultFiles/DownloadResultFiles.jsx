import React from 'react';

const DownloadResultFiles = ({ filesPathName, phaseType }) => {
  return (
    <div className='flex flex-col items-center my-10' style={{ width: '30vw' }}>
      <div className='text-2xl font-bold my-4'>
        You can download the result files from below
      </div>
      {filesPathName.map((file, index) => (
        <div key={index} className='flex justify-between items-center w-full my-2 bg-gray-100 p-2 rounded-lg border border-gray-300'>
          <span className='mr-2'>
            {file.path}
          </span>
          <a
            className='bg-[#8AC62D] hover:bg-green-600 text-white py-2 px-4 rounded'
            href={`http://127.0.0.1:5000/phase-${phaseType}/download/${file.path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  )
}

export default DownloadResultFiles;
