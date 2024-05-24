import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import './SignUp.css';

const SignUp = () => {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [ addUser, { error } ] = useMutation(ADD_USER);

    // Input Handler
    const formInputHandler = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [ name ]: value,
        });
    };

    // Form Submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const signupResponse = await addUser({
                variables: {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password
                },
            });
            const token = signupResponse.data.addUser.token;
            Auth.login(token);
        } catch (e) {
            console.error(e);
            console.log("Unexpected error.");
        }
    };

    return (
        <div className='signup-wrapper d-flex flex-column align align-items-center justify-content-center text-white'>
            <div className='d-flex flex-column'>
                <Link 
                    to='/login' 
                    className='login-link
                                align-self-end 
                                text-white
                                text-decoration-underline'
                    >
                    Log In
                </Link>
                <h2 className='mt-2'>Sign Up</h2>
                <form 
                    onSubmit={handleFormSubmit} 
                    className='mt-2'
                >
                    <div className='mt-2 d-flex flex-column'>
                        <label htmlFor='username'>
                            Username
                        </label>
                        <input 
                            placeholder='Your name'
                            name='username'
                            type='text'
                            id='username'
                            onChange={formInputHandler}
                            className='bg-transparent text-white border border-white mt-2 ps-1'
                        />
                    </div>
                    <div className='mt-2 d-flex flex-column'>
                        <label 
                            htmlFor='email'
                        >
                            Email
                        </label>
                        <input 
                            placeholder='your@email.com'
                            name='email'
                            type='email'
                            id='email'
                            onChange={formInputHandler}
                            className='bg-transparent text-white border border-white mt-2 ps-1'
                        />
                    </div>
                    <div className='mt-2 d-flex flex-column'>
                        <label
                            htmlFor='password'
                        >
                            Password
                        </label>
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
                        <button type='submit' className='signup-btn btn btn-outline-light rounded-0 text-lowercase mt-3 '>
                            sign up
                        </button>
                    </div>
                    {/* Handle backend errors */}
                    {error ? 
                        <div className='mt-2 text-danger'>
                            <p className='fs-6'>Error. Please try again.</p>
                        </div>
                        :
                        null
                    }
                </form>
            </div>
        </div>
    )
}

export default SignUp;