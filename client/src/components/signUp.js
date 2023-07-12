import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from './navbar';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [regErr, setRegErr] = useState(false);
    const [succReg, setSuccReg] = useState(false);

    const handleRegistration = (event) => {
        event.preventDefault();
        setEmail(event.target.value);

        createUserWithEmailAndPassword(auth, email, event.target.password.value)
            .then(() => {

                fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                })
                    .then((res) => {
                        if (res.ok) {
                            setSuccReg(true);
                            setTimeout(() => {
                                setSuccReg(false);
                            }, 2000);
                        }
                        else console.log('Failed to save user');
                    })
                    .catch((err) => {
                        console.log('Error saving user: ', err);
                    })

            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                console.log(errorCode, errorMessage);
                setRegErr(true);
                setTimeout(() => {
                    setRegErr(false);
                }, 2000);
            })
    }

    return (
        <div className='h-screen flex flex-col'>
            <Navbar/>
            <div className='flex flex-col items-center justify-center bg-slate-600 text-black gap-4 h-full'>
                <h1 className='text-4xl my-4'>Sign Up</h1>
                <form className='flex flex-col gap-2 items-center justify-center' onSubmit={handleRegistration}>
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
                    <button className='bg-blue-400 hover:bg-blue-500 p-2 rounded w-full' type='submit'>Register</button>
                </form>
                {regErr && <p className='text-red-500'>User with this email already exists !!</p>}
                {succReg && <p className='text-green-500'>Registered successfully, now you can login !!</p>}
                <p>Already a user? <a className='hover:text-blue-400 hover:underline cursor-pointer' href='/login-page'>Login</a></p>
            </div>
        </div>
    )
}
