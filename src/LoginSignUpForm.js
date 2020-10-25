import React, {useState, useContext, useEffect} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import JoblyApi from './Api';
import './NavBar.css';
import useToggle from './hooks/useToggle';
import AuthContext from './hooks/AuthContext';
import SignupErrors from './FormErrors';

function LoginSignUpForm({type}){
    let formType = type;

    //initial state object has two objects in it. one object is login and the other
    //is signup
    const INITIAL_STATE = {'login':{username:"",password:""},
    'signup':{username:"",password:"",first_name:"",last_name:"",email:"",photo_url:""}}

    //used to track the data entered into the form
    const [form,updateForm] = useState(INITIAL_STATE[formType]);

    //hide and show error about login
    const [displayLoginError,toggleLoginError] = useToggle(false);

    //hide and show errors about signing up
    const [signupErrors, setSignUpErrors] = useState([]);

    //can store token in local storage
    const auth = useContext(AuthContext);

    //track when submit button is clicked for useEffect
    const [submit,setSubmit] = useState(false);

    //useEffect for authentication and registration
    /**
     * important note, useEffect will only run if submit variable changes.
     */
    useEffect(()=>{
        async function formSubmission(){
            if(submit === 'login'){
                try{
                    const result = await JoblyApi.login(form);
                    console.log(result,'sign');
                    if(result){
                        auth['setToken']('token',result.token);
                        auth['setUser']('user',result.user);
                        setSubmit(false);
                        history.push('/applications');
                    }
                    else{
                        toggleLoginError();
                    }
                } catch(error){
                    console.log(error);
                }
            }
            else{
                try{
                    const response = await JoblyApi.signup(form);
                    if(response.status === 201){
                        auth['setToken']('token',response.data.regData.token);
                        auth['setUser']('user',response.data.regData.user);
                        setSubmit(false);
                        history.push('/applications');
                    }
                    else if(response.status === 409){
                        setSubmit(false);
                        setSignUpErrors([response.data.message]);
                    }
                    else if(response === 'something went wrong'){
                        setSubmit(false);
                        setSignUpErrors([response]);
                    }
                    else{
                        setSubmit(false);
                        setSignUpErrors(response);
                    }
                }catch(error){
                    console.log(error);
                }
            }
        }
    if(submit){
        formSubmission();
    }
    },[submit]);

    const history = useHistory();

    //this tracks the changes inside an input and updates the form state
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        updateForm(fData => ({
            ...fData,
            [name]: value
          }));
      }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setSubmit(formType);
    }

    if(formType === 'login'){
        return(
            <Form onSubmit={handleSubmit}>
                <p className={displayLoginError ? 'show' : 'hidden'} style={{color:'red'}}
                >Invalid username and/or password</p>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input onChange={handleChange} type="text" name="username" id="username" required />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input onChange={handleChange} type="password" name="password" id="password" required/>
                </FormGroup>
                <Button color='primary'>Login</Button>
            </Form>
        )
    }
    return(
        <Form onSubmit={handleSubmit}>
            <p style={{color:'red'}}>* required</p>
            <SignupErrors classname={signupErrors ? 'show':'hidden'} 
            errors={signupErrors}/>
            <FormGroup>
                <Label for="username">* Username</Label>
                <Input onChange={handleChange} type="text" name="username" id="username" required/>
            </FormGroup>
            <FormGroup>
                <Label for="password">* Password</Label>
                <Input onChange={handleChange} type="password" name="password" id="password" required/>
            </FormGroup>
            <FormGroup>
                <Label for="first_name">* First Name</Label>
                <Input onChange={handleChange} type="text" name="first_name" id="first_name" required />
            </FormGroup>
            <FormGroup>
                <Label for="last_name">* Last Name</Label>
                <Input onChange={handleChange} type="text" name="last_name" id="last_name" required/>
            </FormGroup>
            <FormGroup>
                <Label for="email">* Email</Label>
                <Input onChange={handleChange} type="email" name="email" id="email" required/>
            </FormGroup>
            <FormGroup>
                <Label for="photo_url">Photo Url</Label>
                <Input onChange={handleChange} type="text" name="photo_url" id="photo_url"/>
            </FormGroup>
            <Button color='primary'>Sign Up</Button>
        </Form>
    )
}

export default LoginSignUpForm;