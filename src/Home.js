import React, {useContext} from 'react';
import {Button, Card, CardBody, CardTitle} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import AuthContext from './hooks/AuthContext';

function Home(){

    const auth = useContext(AuthContext);

    if(auth['user']){
        return <Redirect to='/profile'/>
    }

    return(
        <section className="col-md-8">
        <Card>
            <CardBody className="text-center">
                <CardTitle className="font-weight-bold">
                Welcome to Jobly!
                </CardTitle>
                    <Button color="primary">
                        <a style={{color:'white'}}href='/loginsignup'>Login/SignUp</a>
                    </Button>
            </CardBody>
        </Card>
        </section>
    )

}

export default Home;