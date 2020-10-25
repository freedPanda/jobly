import React from 'react';
import {v4 as uuid} from 'uuid';

function SignupErrors({errors}){
    return(
        <>
            {errors.map(error=>(
                <p key={uuid()}style={{color:'red'}}>
                    {error}
                </p>
            ))}
        </>
    )
}

export default SignupErrors;