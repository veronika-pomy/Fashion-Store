import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import NavBar from "./components/NavBar/NavBar";
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import LogIn from './pages/LogIn/LogIn';
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import SignUp from './pages/SignUp/SignUp';
import SuccessPage from "./pages/Success/SuccessPage";
import { ShopProvider } from './utils/GlobalState';
import ScrollToTop from './utils/ScrollUp';

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
            <ScrollToTop />
            <NavBar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path='/login' exact element={<LogIn />} />
              <Route path='/signup'exact element={<SignUp />} />
              <Route path="/products/:id" exact element={<ProductDetail />} />
              <Route path="/success" exact element={<SuccessPage />} />
              <Route path="/orderHistory" exact element={<OrderHistory />} />
              <Route path="/*" exact element={<Error />} />
            </Routes>
          </ShopProvider>
        </div>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
