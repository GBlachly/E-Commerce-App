import './replaceCartPrompt.css';
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import { selectCart } from '../../store/cart/cartSlice';
import { replaceCartItems } from '../../store/cart/cartActions';


export const ReplaceCartPrompt = (props) => {
    const { toggleShowPrompt } = props;
    const cart = useSelector(selectCart)
    const dispatch = useDispatch();


    const handleYesClick = () => {
        dispatch(replaceCartItems(cart.products));
        toggleShowPrompt(false);
    };


    return (
        <div className='replace-cart-prompt' >
            <p>Do You Want to Replace Your Previous Cart With Your New One?</p>
            <button onClick={handleYesClick} >YES</button>
            <button onClick={ ()=>{toggleShowPrompt(false)} }>NO</button>
        </div>
    );
};
