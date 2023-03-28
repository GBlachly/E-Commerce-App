import './ProductItem.css';
import React from 'react'; 
import { Link } from 'react-router-dom';


export const ProductItem = (props) => {
    const { /*id,*/ name, price, url } = props.product;
    const { index } = props;

    return (
        <div className='card col-6 col-md-3'>

            <img className='card-img-top h-50 mt-2' src={url} alt='product'/>
            <div className='card-body'>
                <h5 className='card-title'>{name}</h5>
                <p className='card-text'>{price}</p>
                <Link to={`/products/${index}`} className='btn btn-danger'>More Details</Link>
            </div>

        </div>
    );
};