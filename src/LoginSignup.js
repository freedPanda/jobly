import React from 'react';
import {Button, Card, CardBody, CardTitle, ButtonGroup} from 'reactstrap';
import useSetVal from './hooks/useSetVal';
import LoginSignUpForm from './LoginSignUpForm';

function LoginSignUp(){

    const [formType,setType] = useSetVal('login');

    return(
        <Card>
            <CardBody >
                <CardTitle className="font-weight-bold">
                <ButtonGroup margin="2px">
                    <Button color={formType==='login'?'primary':'secondary'}
                    onClick={()=>{setType('login')}}>Login</Button>

                    <Button color={formType==='signup'?'primary':'secondary'}
                    onClick={()=>{setType('signup')}}>SignUp</Button>
                </ButtonGroup>
                </CardTitle>
                <LoginSignUpForm type={formType}/>
            </CardBody>
        </Card>
    )
}

export default LoginSignUp;