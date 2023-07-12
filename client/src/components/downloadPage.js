import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useParams } from 'react-router-dom';
import { decryptEmail } from '../cryptography';
import Navbar from './navbar';

export default function DownloadPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(false);
  const [filesFetched, setFilesFetched] = useState(false);
  const { e } = useParams();
  const decrypEmail = decryptEmail(e);

  const handleUploadedFiles = () => {
    if (filesFetched) {
      setShowFiles(!showFiles);
    }
    else {
      fetch(`/uploaded-files?email=${decrypEmail}`)
        .then(res => res.json())
        .then(data => {
          setUploadedFiles(data)
          setShowFiles(true)
          setFilesFetched(true)
        })
        .catch(err => console.log('Error retrieving files list', err));
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const response = await fetch(`/download/${fileName}`);
      const blob = await response.blob();

      const fileUrl = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = fileUrl;
      anchor.download = fileName;
      anchor.click();

      anchor.remove();
      URL.revokeObjectURL(fileUrl);
    } catch (err) {
      console.log('Error downloading file: ', err);
    }
  }

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='h-full w-full bg-slate-600 text-black flex items-center justify-center flex-col gap-12'>
        <h1 className='text-4xl'>Shared Files</h1>
        <button className='bg-gray-700 text-slate-400 hover:bg-slate-400 hover:text-gray-700 px-4 py-2 rounded' onClick={handleUploadedFiles}>
          {showFiles ? 'Hide Shared Files' : 'Show Shared Files'}
        </button>
        {showFiles && (
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2 bg-gray-500 p-2 rounded max-h-56 overflow-auto' style={{ scrollbarWidth: 'thin' }}>
              {uploadedFiles.map(file => {
                return (
                  <div className='flex gap-4' key={file.name}>
                    <div className='w-64 truncate'>
                      <span>{file.name}</span>
                    </div>
                    <div className='group'>
                      <button className='bg-gray-300 button_here' onClick={() => window.open(`${window.location.origin}/stream/${file.name}`, '_blank')} type="button">
                        <span className='button_text'>View</span>
                        <SearchIcon className='button_icon' />
                      </button>
                    </div>
                    <div className='group'>
                      <button className='bg-blue-300 button_here' onClick={() => handleDownload(file.name)}>
                        <span className='button_text'>Download</span>
                        <FileDownloadOutlinedIcon className='button_icon' />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};