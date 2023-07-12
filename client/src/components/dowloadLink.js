import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from './navbar';

export default function DownloadLink() {

    const [link, setLink] = useState('');

    const handleInput = (e) => {
        setLink(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = link;
    }

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='h-full w-full flex flex-col items-center justify-center bg-slate-600 text-black'>
                <div className='flex flex-col gap-2 items-center justify-center w-80'>
                    <h1 className='text-2xl'>Paste the shared link !!</h1>
                    <form className='flex gap-2' onSubmit={handleSubmit}>
                        <input className='input-field bg-gray-400' type="text" onChange={handleInput} />
                        <button className='p-2 rounded bg-gray-800 hover:bg-gray-400' type='submit'>
                            <ArrowForwardIcon className='text-gray-200' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
