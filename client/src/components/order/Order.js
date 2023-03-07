import './Order.css';
import React from 'react'; 
import { OrderItem } from '../orderItem/OrderItem';


export const Order = (props) => {
    const { order, index } = props;

    return (
        <div className='order row my-4'>
            <div className='col-12'>
                
                <h3>Order Id: {order.id}</h3>
                <h4>Order Index: {index}</h4>
                <h4>User Id: {order.userId}</h4>
                <h4>Total Price: {order.totalPrice}</h4>
                <h4>Ship Status: {order.shipStatus}</h4>

                
                {order.products.map(product => {
                    return (
                        <OrderItem product={product} />
                    )
                })} 
                
            </div>   
        </div>
    );
};