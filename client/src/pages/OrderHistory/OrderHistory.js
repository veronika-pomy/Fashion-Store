import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard/OrderCard.js';
import { QUERY_USER } from '../../utils/queries';
import './OrderHistory.css';

const OrderHistory = () => {

    const { data } = useQuery(QUERY_USER);
    let user;
    let pageCount = 0;
    
    if (data) user = data.user;

    // pagination
    const [ orders, setOrders ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const pageSize = 3;
    if (data) pageCount = Math.ceil(data.user.orders.length / pageSize);

    useEffect(() => {
        if (data) {
            const ordersPerPage = [];
            const start = pageSize * currentPage - pageSize;
            const end = Math.min(pageSize * currentPage, data.user.orders.length);
    
            for (let i = start; i < end; i++) {
                ordersPerPage.push(data.user.orders[i]);
            };
    
            setOrders(ordersPerPage);
        }

    }, [ data, currentPage ]);

    // page buttons
    const pageHandler = (page) => {
        setCurrentPage(page);
    };

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
            className='ms-5 me-5 p-4 order-history-container'
        >
            <Link 
                to='/'
                className='order-history-link
                            text-dark 
                            text-decoration-underline
                            '
            >
                Continue Shopping
            </Link>
            <div className='fs-6 text-dark d-flex flex-column'>
                {!orders.length ? 
                <p className='fs-3 mt-5 text-center'>You have no orders yet</p>
                :
                orders.map((order) => (
                    <div 
                        className='card w-50 me-5 mt-3 position-relative z-0 align-self-center'
                        key={order._id}
                    >
                        <p className='d-inline card-header'>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</p>
                        <div className='d-inline pt-1'>
                            <OrderCard order={order}/>
                        </div>
                    </div>
                ))}
                {/* Pagination */}
                {orders.length > 0 && 
                    <div
                        className='align-self-center mt-4 me-5'
                    >   
                        <button 
                            type="button"
                            className="btn btn-light text-lowercase m-1"
                            onClick={() => pageHandler(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Back
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-light text-lowercase m-1"
                            onClick={() => pageHandler(currentPage + 1)}
                            disabled={currentPage === pageCount}
                        >
                            Next
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default OrderHistory;