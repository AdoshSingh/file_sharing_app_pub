import React, { useState } from 'react';
import stock from '../assets/exo';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
    const navigate = useNavigate();
    const [ham, setHam] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDropMenu = () => {
        setHam(!ham);
        setIsOpen(!isOpen);
    }

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex justify-between bg-slate-500'>
                <div className='flex items-center justify-center'>
                    <img className='w-20' src={stock.logoIcon} alt="" />
                    <h1 className='text-xl md:text-3xl'>File Nexus</h1>
                </div>
                <div className='flex justify-center items-center bg-gray-700 w-20 sm:hidden'>
                    {isOpen == false ? 
                        <MenuIcon className='text-slate-500 scale-125' onClick={handleDropMenu}/>
                        :
                        <CloseIcon className='text-slate-500 scale-125' onClick={handleDropMenu}/>
                    }
                </div>
                <ul className='hidden sm:flex items-center justify-center'>
                    <li className='navbar-items border-l' onClick={() => navigate('/')}>Home</li>
                    <li className='navbar-items' onClick={() => navigate('/upload-page')}>Upload</li>
                    <li className='navbar-items' onClick={() => navigate('/download-link-page')}>Download</li>
                    <li className='navbar-items' onClick={() => navigate('/login-page')}>Login</li>
                    <li className='navbar-items' onClick={() => navigate('/signup-page')}>Signup</li>
                </ul>
            </div>
            {ham &&
                <div id='drop' className='relative'>
                    <ul className='absolute bg-gray-400 w-full flex flex-col items-center'>
                        <li className='h-full w-full text-center border-b p-2' onClick={() => navigate('/')}>Home</li>
                        <li className='h-full w-full text-center border-b p-2' onClick={() => navigate('/upload-page')}>Upload</li>
                        <li className='h-full w-full text-center border-b p-2' onClick={() => navigate('/download-link-page')}>Download</li>
                        <li className='h-full w-full text-center border-b p-2' onClick={() => navigate('/login-page')}>Login</li>
                        <li className='h-full w-full text-center p-2' onClick={() => navigate('/signup-page')}>Signup</li>
                    </ul>
                </div>
            }
        </div>
    )
}
