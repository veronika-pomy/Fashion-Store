import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { LOG_IN } from '../../utils/mutations';
import './LogIn.css';

const LogIn = () => {

    const [ formState, setFormState ] = useState({ email: '', password: '' });
    const [ login, { error } ] = useMutation(LOG_IN);

    // Input Handler
    const formInputHandler = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    
    // Form Submit 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formState.email);
        console.log(formState.password);
        try {
            const loginResponse = await login({
                variables: {
                    email: formState.email,
                    password: formState.password
                },
            });
            const token = loginResponse.data.login.token;
            console.log(token);
            Auth.login(token);
        } catch (e) {
            console.error(e);
            console.log("Unexpected error.");
        };
    };
    return(
        <div className='login-wrapper d-flex flex-column align align-items-center justify-content-center'>
            <div className='d-flex flex-column text-white'>
                <Link to='/signup' className="align-self-end text-white">
                    To Sign Up
                </Link>
                <h2 className='mt-2'>Log In</h2>
                <form 
                    onSubmit={handleFormSubmit}
                    className='mt-2'
                >
                    <div className='mt-2 d-flex flex-column'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            placeholder='your@email.com'
                            name='email'
                            type='email'
                            id='email'
                            onChange={formInputHandler}className='bg-transparent text-white border border-white mt-2 ps-1'
                        />
                    </div>
                    <div className='mt-2 d-flex flex-column'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            placeholder='*******'
                            name='password'
                            type='password'
                            id='password'
                            onChange={formInputHandler}
                            className='bg-transparent text-white border border-white mt-2 ps-1'
                        />
                    </div>
                    <div className='mt-2'>
                        <button type='submit' className='login-btn btn btn-outline-light rounded-0 text-lowercase mt-3'>
                            log in
                        </button>
                    </div>
                    {/* Handle backend errors */}
                    {error ? 
                        <div className='mt-2 text-danger'>
                            <p className='fs-6'>
                                Error. Please try again.
                            </p>
                        </div>
                        :
                        null
                    }
                </form>
            </div>
        </div>
    )
}

export default LogIn;