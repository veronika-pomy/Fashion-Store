import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { LOG_IN } from '../../utils/mutations';

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
            <div>
            <Link to='/signup'> Sign Up</Link>
            <h2>Log In</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                        placeholder='Email'
                        name='email'
                        type='email'
                        id='email'
                        onChange={formInputHandler}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
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
                {/* Handle backend errors */}
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