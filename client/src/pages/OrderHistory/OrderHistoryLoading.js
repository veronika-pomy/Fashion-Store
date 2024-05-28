import React from 'react';
import Skeleton from '../../components/Skeleton.js';
import './OrderHistory.css';

const OrderHistoryLoading = () => {
  return (
    <div className='ms-5 me-5 p-4 order-history-container'>
        <div className='w-25'>
            <Skeleton />
        </div>
        <div className='fs-6 d-flex flex-column'>
            <div className='w-50 me-5 mt-3 position-relative z-0 align-self-center'>
                <p>
                    <Skeleton />
                </p>
                <div>
                    <Skeleton />
                </div>
            </div>
        </div>
        <div className='fs-6 d-flex flex-column'>
            <div className='w-50 me-5 mt-3 position-relative z-0 align-self-center'>
                <p>
                    <Skeleton />
                </p>
                <div>
                    <Skeleton />
                </div>
            </div>
        </div>
        <div className='fs-6 d-flex flex-column'>
            <div className='w-50 me-5 mt-3 position-relative z-0 align-self-center'>
                <p>
                    <Skeleton />
                </p>
                <div>
                    <Skeleton />
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderHistoryLoading;