import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import LogIn from './pages/LogIn/LogIn';
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import SignUp from './pages/SignUp/SignUp';
import SuccessPage from "./pages/Success/SuccessPage";
import { ShopProvider } from './utils/GlobalState';
import Footer from './components/Footer/Footer';

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
              <Route 
                path="/success" 
                element={<SuccessPage />} 
              />
              <Route 
                path="/orderHistory" 
                element={<OrderHistory />} 
              />
              <Route 
                path="*" 
                element={<Error />} 
              />
            </Routes>
          </ShopProvider>
        </div>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
