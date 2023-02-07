import './OrdersPage.css';
import React from 'react'; 
import { Order } from '../../components/order/Order';


export const OrdersPage = () => {
    const orders = [
        {
            id: 111, 
            userId: 1, 
            totalPrice: 199.99, 
            products: [
                {productId: 1, productName: 'Lamp', quantity: 1},
                {productId: 2, productName: 'Desk', quantity: 2}
            ]
        },
        {
            id: 222, 
            userId: 1, 
            totalPrice: 299.99, 
            products: [
                {productId: 3, productName: 'Chair', quantity: 3},
                {productId: 4, productName: 'Table', quantity: 4}
            ]
        },
        {
            id: 333, 
            userId: 1, 
            totalPrice: 399.99, 
            products: [
                {productId: 5, productName: 'Keyboard', quantity: 5},
                {productId: 6, productName: 'Mouse', quantity: 6}
            ]
        },
    ];


    return (
        <div className='col-12'>

            <h1>Orders</h1>

            <div className='orders'>
                {orders.map(order => {
                    return (
                        <Order order={order}/>
                    )
                })}
            </div>

        </div>
    );
};
