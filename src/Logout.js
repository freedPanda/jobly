import React from 'react';
import {useHistory} from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';

function Logout(){

    const history = useHistory();

    return(
        <div>
            <Jumbotron>
                <h1 className="display-3">Goodbye!</h1>
                <p className="lead">Comeback soon! Your future awaits...</p>
                <hr className="my-2" />
                <p>More jobs are added every day and every day more people are searching
                    for a new job.
                </p>
                <p className="lead">
                <Button onClick={()=>{history.push('/loginsignup')}}color="primary">Login</Button>
                </p>
            </Jumbotron>
        </div>
    )
}

export default Logout;