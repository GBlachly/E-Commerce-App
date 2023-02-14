import './Order.css';
import React from 'react'; 
import { OrderItem } from '../orderItem/OrderItem';


export const Order = (props) => {
    const { order, index } = props;

    return (
        <div className='order'>
            <h2>Order Id: {order.id}</h2>
            <h2>Order Index: {index}</h2>
            <h3>User Id: {order.userId}</h3>
            <h3>Total Price: {order.totalPrice}</h3>
            
            <div className='order-items'>
                {order.products.map(product => {
                    return (
                        <OrderItem product={product} />
                    )
                })} 
            </div>

            <hr></hr>     
        </div>
    );
};