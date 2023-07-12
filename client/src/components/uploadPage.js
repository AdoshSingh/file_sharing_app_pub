import React, { useState, useEffect } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useNavigate } from 'react-router-dom';
import { encryptEmail } from '../cryptography';
import Navbar from './navbar';

export default function UploadPage() {

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(false);
  const [filesFetched, setFilesFetched] = useState(false);
  const [currFile, setCurrFile] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    setUserEmail(storedEmail);
  }, []);

  if (!userEmail) navigate('/login-page');

  const handleUploadedFiles = () => {
    if (filesFetched) {
      setShowFiles(!showFiles);
    }
    else {
      fetch(`/uploaded-files?email=${userEmail}`)
        .then(res => res.json())
        .then(data => {
          setUploadedFiles(data)
          setShowFiles(true)
          setFilesFetched(true)
        })
        .catch(err => console.log('Error retrieving files list', err));
    }
  };

  const handleDelete = (file) => {
    fetch(`/delete-file/${file.name}?email=${userEmail}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUploadedFiles(uploadedFiles.filter(f => f.name !== file.name));
        }
      })
      .catch(err => console.log('Error deleting file', err));
  }

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

  const handleDownloadPage = () => {
    const crypEmail = encryptEmail(userEmail);
    navigate(`/download-page/${crypEmail}`);
  }

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login-page');
  }

  return (
    <div className='h-screen flex flex-col'>
      <Navbar/>
      <div className='h-full w-full bg-slate-600 text-black flex items-center justify-center flex-col gap-12'>
        <h1 className='text-4xl'>Upload Files</h1>
        <form action={`/upload?email=${userEmail}`} method='POST' encType='multipart/form-data'>
          <div className='flex flex-col items-center  gap-2'>
            <div className='bg-gray-500 hover:bg-gray-400 h-20 w-20 flex items-center justify-center rounded-xl'>
              <label htmlFor="file">
                <FileUploadOutlinedIcon className='cursor-pointer scale-150' />
              </label>
            </div>
            <input type="file" id='file' name="file" onChange={e => setCurrFile(e.target.files[0])} style={{ display: "none" }} required />
            {currFile && <p>{currFile.name}</p>}
            <button className='bg-blue-400 hover:bg-blue-500 p-3 rounded-xl w-20' type='submit'>Upload</button>
          </div>
        </form>
        <button className='bg-gray-700 text-slate-400 hover:bg-slate-400 hover:text-gray-700 px-4 py-2 rounded' onClick={handleUploadedFiles}>
          {showFiles ? 'Hide Uploaded Files' : 'Show Uploaded Files'}
        </button>
        {showFiles && (
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2 bg-gray-500 p-2 rounded max-h-56 overflow-auto' style={{ scrollbarWidth: 'thin' }}>
              {uploadedFiles.map(file => {
                return (
                  <div className='flex gap-4' key={file.name}>
                    <div className='w-72 truncate'>
                      <span>{file.name}</span>
                    </div>
                    <div className='group'>
                      <button className='bg-gray-300 button_here' onClick={() => window.open(`${window.location.origin}/stream/${file.name}`, '_blank')} type="button">
                        <span className='button_text'>View</span>
                        <SearchIcon className='button_icon' />
                      </button>
                    </div>
                    <div className='group'>
                      <button className='bg-red-400 button_here' onClick={() => handleDelete(file)}>
                        <span className='button_text'>Delete</span>
                        <DeleteOutlineIcon className='button_icon' />
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
            <div className='flex justify-center w-full bg-gray-500 px-2 rounded'>
              <a className='underline hover:text-blue-300' href='' onClick={handleDownloadPage}>
                Share this link
              </a>
            </div>
          </div>
        )}
        <button className='bg-slate-400 hover:bg-slate-500 p-1 rounded absolute right-0 bottom-0 m-4' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}