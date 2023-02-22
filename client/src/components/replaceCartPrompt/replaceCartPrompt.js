import './replaceCartPrompt.css';
import React from 'react'; 


export const ReplaceCartPrompt = (props) => {
    const { handleCartLoad, handleCartReplace } = props;

    return (
        <div className='col-12'>
            <div className='replace-cart-prompt' >
                <p>Do You Want to Replace Your Previous Cart With Your New One?</p>
                <button onClick={handleCartReplace} >YES</button>
                <button onClick={handleCartLoad}>NO</button>
            </div>
        </div>
    );
};
