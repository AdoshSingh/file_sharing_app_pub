import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

export default function LogIn() {

    const [email, setEmail] = useState('');
    const [logErr, setLogErr] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();
        setEmail(e.target.value);

        signInWithEmailAndPassword(auth, email, e.target.password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                localStorage.removeItem('email');
                localStorage.setItem('email', email);

                navigate('/upload-page', { replace: true });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setLogErr(true);
                setTimeout(() => {
                    setLogErr(false);
                }, 2000);
            })
    }

    return (
        <div className='h-screen flex flex-col'>
            <Navbar/>
            <div className='flex flex-col items-center justify-center bg-slate-600 text-black gap-4 h-full'>
                <h1 className='text-4xl my-4'>Log In</h1>
                <form className='flex flex-col gap-2 items-center justify-center' onSubmit={handleLogin}>
                    <div>
                        <input
                            className='input-field'
                            type="email"
                            id='email'
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div>
                        <input
                            className='input-field'
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button className='bg-blue-400 hover:bg-blue-500 p-2 rounded w-full' type='submit'>Login</button>
                </form>
                {logErr && <p className='text-red-500'>Wrong email or password!!</p>}
                <p>Don't have an account? <a className='hover:text-blue-400 hover:underline cursor-pointer' href='/signup-page'>SignUp</a></p>
            </div>
        </div>
    )
}