import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOG_IN } from '../../utils/mutations';
import Auth from '../../utils/auth';

const LogIn = () => {

    const [ formState, setFormState ] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOG_IN);

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
            const loginResponse = await login({
                variables: {
                    email: formState.email,
                    password: formState.password
                },
            });
            const token = loginResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log("Unexpected error.");
        };
    };
    return(
            <div>
            <Link to='/signup'> Sign Up</Link>
            <h2>Log In</h2>
            <form onSubmit={handleFormSubmit}>
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
                {error ? 
                    <div>
                        <p>Incorrect credentials. Please try again.</p>
                    </div>
                    :
                    null
                }
            </form>
        </div>
    )
}

export default LogIn;