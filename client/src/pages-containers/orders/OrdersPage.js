import './OrdersPage.css';
import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectLoggedIn } from '../../store/auth/authSlice';
import { selectOrders, selectOrdersLoading, selectOrdersError } from '../../store/orders/ordersSlice';
import { loadUserOrders } from '../../store/orders/ordersActions';
import { Order } from '../../components/order/Order';


export const OrdersPage = () => {
    const loggedIn = useSelector(selectLoggedIn);
    const isLoading = useSelector(selectOrdersLoading);
    const hasError = useSelector(selectOrdersError);
    const orders = useSelector(selectOrders);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(loadUserOrders());
    }, [dispatch]); 
    

    if (!loggedIn) {
        return (
            <Navigate to='/login' replace={true} />
        )
    };

    if (isLoading) {
        return (
            <div className='col-12'>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (hasError) {
        return (
            <div className='col-12'>
                <h1>Error Occurred</h1>
            </div>
        )
    };

    return (
        <div className='col-12'>

            <h1>Orders</h1>

            <div className='orders'>
                {orders.map((order, index) => {
                    return (
                        <Order order={order} index={index}/>
                    )
                })}
            </div>

        </div>
    );
};

    /*const orders = [
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
    ]; */