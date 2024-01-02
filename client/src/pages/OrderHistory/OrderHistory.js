import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

const OrderHistory = () => {

    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) user = data.user;

    return (
        <div>
            <Link to="/">Return</Link>

            {user ? 
                (
                    <div>
                        <h3>{user.username}'s Order History</h3>
                        {user.orders.map((order) => (
                            <div key={order._id}>
                                <h4>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h4>
                                <div>
                                {order.products.map(({ _id, img, name, price }, index) => (
                                    <div key={index}>
                                        <Link to={`/products/${_id}`}>
                                            <img alt={name} src={`/imgs/${img}`} />
                                            <p>{name}</p>
                                        </Link>
                                        <span>${price}</span>
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) 
            :
                null
            }

        </div>
    )
}

export default OrderHistory;