import React from 'react';
import Skeleton from '../../components/Skeleton.js';
import './ProductDetail.css';

const ProductDetailLoading = () => {
  return (
    <div className='product-detail-loading ms-4'>
        <div className='prod-wrapper d-flex flex-row flex-wrap'>
            <div>
                <Skeleton className='loading-image prod-img ms-4 mt-5 me-4' />
            </div>
            <div className='text-wrapper'>
                <Skeleton width={150} />
                <h3 className='prod-name'>
                    <Skeleton width={200}/>
                </h3>
                <p className='description-wrapper'>
                    <Skeleton width={400} />
                    <Skeleton width={400} />
                </p>
                <p>
                    <div className='mt-2'>
                        <Skeleton width={100} />
                    </div>
                </p>
            </div>
        </div>
    </div>
  )
}

export default ProductDetailLoading;