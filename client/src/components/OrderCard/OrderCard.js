import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({ order }) => {

    const total = order.products.reduce((prev = 0, {price}) => prev + price, 0);

    return (
        <div>
        {order.products.map(({ _id, image, name, price }, index) => (
            <div key={index} >
                <Link 
                    className='
                        ps-4
                        order-history-link
                        text-dark 
                        text-decoration-underline
                        d-inline'
                    to={`/products/${_id}`}
                >
                    {/* <img 
                        alt={name} 
                        src={require(`../../assets/images/${image}`)} 
                    /> */}
                    <p className='d-inline'>{name}</p>
                </Link>
                <span> - ${price}</span>
            </div>
        ))}
        <div>
            <hr />
            <p
                className='fw-bold ps-4'
            >
                Order Total:<span className='fw-normal'> ${total}</span>
            </p>
        </div>
        </div>
    )
};

export default OrderCard;