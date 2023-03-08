import './HomePage.css';
import React, { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';

import { loadAllProducts } from '../../store/products/productsActions';

const images = {
    img1: 'https://res.cloudinary.com/dk4ghzlai/image/upload/v1678307825/ecommerce-app-products/business-clean-desk-diary-thumb_gyki8t.jpg',
    img2: 'https://res.cloudinary.com/dk4ghzlai/image/upload/v1678308111/ecommerce-app-products/office-setup-with-apple-monitor-and-computer_h40d8y.jpg',
};


export const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllProducts());
        
    }, [dispatch]); 


    return (
        <div className='col-12'>

            <div className='banner'>
                <div className='title-card'>
                    <h1>Welcome to the Wide World of Non-Branded Office Supplies</h1>
                </div>
            </div>

            <div className='about mx-3 my-2'>
                <h2>About</h2>

                <img 
                    src={images.img1}
                    alt='Office Chair'
                    className='mr-2'
                />

                <p>Green vines attached to the trunk of the tree had wound 
                    themselves toward the top of the canopy. Ants used the 
                    vine as their private highway, avoiding all the creases 
                    and crags of the bark, to freely move at top speed from 
                    top to bottom or bottom to top depending on their current 
                    chore. At least this was the way it was supposed to be. 
                    Something had damaged the vine overnight halfway up the 
                    tree leaving a gap in the once pristine ant highway.

                    Green vines attached to the trunk of the tree had wound 
                    themselves toward the top of the canopy. Ants used the 
                    vine as their private highway, avoiding all the creases 
                    and crags of the bark, to freely move at top speed from 
                    top to bottom or bottom to top depending on their current 
                    chore. At least this was the way it was supposed to be. 
                    Something had damaged the vine overnight halfway up the 
                    tree leaving a gap in the once pristine ant highway.

                    Green vines attached to the trunk of the tree had wound 
                    themselves toward the top of the canopy. Ants used the 
                    vine as their private highway, avoiding all the creases 
                    and crags of the bark, to freely move at top speed from 
                    top to bottom or bottom to top depending on their current 
                    chore. At least this was the way it was supposed to be. 
                    Something had damaged the vine overnight halfway up the 
                    tree leaving a gap in the once pristine ant highway.

                    Green vines attached to the trunk of the tree had wound 
                    themselves toward the top of the canopy. Ants used the 
                    vine as their private highway, avoiding all the creases 
                    and crags of the bark, to freely move at top speed from 
                    top to bottom or bottom to top depending on their current 
                    chore. At least this was the way it was supposed to be. 
                    Something had damaged the vine overnight halfway up the 
                    tree leaving a gap in the once pristine ant highway.
                </p>
            </div>
            
        </div>
    );
};
