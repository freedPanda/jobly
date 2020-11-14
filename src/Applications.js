import React, {useState, useEffect, useContext} from 'react';
import {v4 as uuid} from 'uuid';
import AuthContext from './hooks/AuthContext';
import {useHistory} from 'react-router-dom';
import Application from './Application';
import {Jumbotron, Button, Container} from 'reactstrap';

function Applications(){

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [applications, setApps] = useState([])

    useEffect(()=>{
        setApps(auth['user'].applications);
    },[])

    if(!applications){
        return(
            <Jumbotron>
                <h1 className="display-5">You haven't applied yet!</h1>
                <p className="lead">There are many oppurtunites!</p>
                <hr className="my-2" />
                <p>More jobs are added every day and every day more people are searching
                    for a new job.
                </p>
                <p className="lead">
                <Button onClick={()=>{history.push('/jobs')}}color="primary">View Jobs</Button>
                </p>
            </Jumbotron>
        )
    }
    return(
        <Container fluid={true} style={{textAlign:'center'}}>
        <h3 style={{color:'black'}}>My Applications</h3>
        {applications.map(applications =>(
            <Application key={uuid()} application={applications}/>
        ))}
        </Container>
    )
}
export default Applications;