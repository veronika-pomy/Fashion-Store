import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard/OrderCard.js';
import { QUERY_USER } from '../../utils/queries';
import './OrderHistory.css';

const OrderHistory = () => {

    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) user = data.user;

    if (!user) 
        return (
            <div className='login-redirect-wrapper'>
                <p className='login-redirect'>
                        Please <Link 
                            className='order-history-link 
                                        text-center text-decoration-underline
                                        text-dark' 
                            to='/login'>
                                Log in
                        </Link> to continue.
                </p>
            </div>
        );

    return (
        <div
            className='order-history-container'
        >
            <Link 
                to="/"
                className='order-history-link-return
                            text-center 
                            text-decoration-underline
                            text-dark'
            >
                Return
            </Link>
            <div className='fs-6 text-dark'>
                {user.orders.map((order) => (
                    <div 
                        className='mt-3'
                        key={order._id}
                    >
                        <p className='d-inline'>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</p>
                        <div className='d-inline'>
                            <OrderCard order={order} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;