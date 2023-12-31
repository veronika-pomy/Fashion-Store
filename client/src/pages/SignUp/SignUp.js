import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

const SignUp = () => {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

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
            console.log("Unexpected error.");
        }
    };

    return (
        <div>
            <Link to='/login'>Login</Link>
            <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label for='username'>Username</label>
                    <input 
                        placeholder='Username'
                        name='username'
                        type='text'
                        id='username'
                        onChange={formInputHandler}
                    />
                </div>
                <div>
                    <label for='email'>Email</label>
                    <input 
                        placeholder='Email'
                        name='email'
                        type='email'
                        id='email'
                        onChange={formInputHandler}
                    />
                </div>
                <div>
                    <label for='password'>Password</label>
                    <input 
                        placeholder='*****'
                        name='password'
                        type='password'
                        id='password'
                        onChange={formInputHandler}
                    />
                </div>
                <div>
                    <button type='submit'>
                        Submit
                    </button>
                </div>
                {/* Handle server errors */}
                {error ? 
                    <div>
                        <p>Error. Please try again.</p>
                    </div>
                    :
                    null
                }
            </form>
        </div>
    )
}

export default SignUp;