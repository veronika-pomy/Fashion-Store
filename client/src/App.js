import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ShopProvider } from './utils/GlobalState';

// Add pages

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='app-container'>
          <ShopProvider>
            <h1>New App</h1>
            {/* NavBar */}
            <Routes>
              {/* Home */}
              {/* LogIn */}
              {/* SignUp */}
              {/* Success */}
              {/* OrderHistory */}
              {/* Detail */}
              {/* Error */}
            </Routes>
          </ShopProvider>
        </div>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;