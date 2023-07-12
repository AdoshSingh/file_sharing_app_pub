import React from 'react';
import stock from '../assets/exo';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

  const navigate = useNavigate();

  return (
    <div className='h-full w-full flex flex-col items-center bg-slate-600 text-black'>
      <div className='flex md:h-1/5 w-full items-center justify-between border-b-2 border-slate-400'>
        <div className='flex items-center'>
          <img className='w-24 sm:w-32 lg:w-40' src={stock.logoIcon} alt="" />
          <h1 className='text-2xl sm:text-4xl lg:text-6xl font-semibold font-mons text-logo'>File Nexus</h1>
        </div>
        <div className='flex flex-col justify-evenly h-full sm:flex-row sm:gap-2 lg:gap-20 items-center mx-2 md:mx-10'>
          <div className='logsi-btn' onClick={() => navigate('/login-page')}>Login</div>
          <div className='logsi-btn' onClick={() => navigate('/signup-page')}>SignUp</div>
        </div>
      </div>
      <div className='h-4/5 w-full flex flex-col-reverse justify-evenly sm:flex-row'>
        <div className='sm:w-3/6 flex items-center justify-center sm:border-r-2 border-slate-400'>
          <a className='downup-btn' href="/download-link-page">
            <img className='w-20' src={stock.downloadIcon} alt="" />
            <span className='text-2xl font-medium'>Download</span>
          </a>
        </div>
        <div className='sm:w-3/6 flex items-center justify-center'>
          <a className='downup-btn' href="/upload-page">
            <img className='w-20' src={stock.uploadIcon} alt="" />
            <span className='text-2xl font-medium'>Upload</span>
          </a>
        </div>
      </div>
    </div>
  )
}