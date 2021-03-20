import React from 'react';
import loader from './LoadingImage1.gif'

function Spinner1()
{
    return(
        <div style={{paddingLeft:330}}>
        <img  src={loader} alt="loading..." />
        </div>
    )
}
export default Spinner1;