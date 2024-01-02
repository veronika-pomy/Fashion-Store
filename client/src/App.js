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
import NavBar from "./components/NavBar/NavBar";

// Add pages
import Home from './pages/Home/Home';
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import Error from './pages/Error/Error';

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
            <NavBar />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path='/login' 
                element={<LogIn />} 
              />
              <Route 
                path='/signup'
                element={<SignUp />} 
              />
              <Route 
                path="/products/:id" 
                element={<ProductDetail />} 
              />
              {/* Success */}
              {/* OrderHistory */}
              <Route 
                path="*" 
                element={<Error />} 
              />
            </Routes>
          </ShopProvider>
        </div>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
