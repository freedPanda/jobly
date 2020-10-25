import React,{useState, useEffect, useContext} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import JoblyApi from './Api';
import EditErrors from './FormErrors';
import VerificationModal from './VerificationModal';
import AuthContext from './hooks/AuthContext';

function EditProfileForm({user, className, setUser}){

    const INIT = {first_name:user.first_name,last_name:user.last_name,
        email:user.email,photo_url:user.photo_url ? user.photo_url : false}

    const [form, updateForm] = useState(INIT);

    const auth = useContext(AuthContext);

    const history = useHistory();

    //setPassword is passed to the VerificationModal so the
    //db can make sure the user is in fact the user of this account
    const [password,setPassword] = useState(false);

    //track when submit button is clicked for useEffect
    const [submit,setSubmit] = useState(false);

    //hide and show modal
    const [modal,setModal] = useState(false);

    //hide and show errors about signing up
    const [signupErrors, setSignUpErrors] = useState([]);

    //set token and the user. Or clear both and set both in local storage.
    //by updating local storage this reduces axios requests.
    useEffect(()=>{
        async function formSubmission(){
            try{
                if(!form.photo_url){delete form.photo_url};
                const response = await JoblyApi.patchRequest(
                auth['token'],
                `users/${auth['user'].username}`,
                {...form,password:password});

                setSubmit(false);
                setPassword(false);
                setModal(false);

                if(response.status === 200){
                    auth['setUser']('user',response.data.user);
                    setUser(response.data.user);
                }
                else{
                    setSignUpErrors([response]);
                }
            }catch(error){
                console.log(error);
            }
        }
        if(submit && password){
            console.log('submitted');
            formSubmission();
        }
        
    },[submit,password])

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        updateForm(fData => ({
            ...fData,
            [name]: value
          }));
      }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setModal(true);
        setSubmit(true);
    }

    return (
        <>
        <Form onSubmit={handleSubmit} className={className} style={{margin:'.7rem'}}>
            <EditErrors classname={signupErrors ? 'show':'hidden'} 
            errors={signupErrors}/>
            <FormGroup>
                <Label for="first_name">First Name</Label>
                <Input onChange={handleChange} type="text" name="first_name" 
                id="first_name" defaultValue={user.first_name} required />
            </FormGroup>
            <FormGroup>
                <Label for="last_name">Last Name</Label>
                <Input onChange={handleChange} type="text" name="last_name" 
                id="last_name" defaultValue={user.last_name} required/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input onChange={handleChange} type="email" name="email" 
                id="email" defaultValue={user.email} required/>
            </FormGroup>
            <FormGroup>
                <Label for="photo_url">Photo Url</Label>
                <Input onChange={handleChange} type="text" name="photo_url" 
                id="photo_url" />
            </FormGroup>
            <Button color='primary'>Update</Button>
        </Form>
        <VerificationModal display={modal} 
        setPassword={setPassword} resetModal={setModal}/>
        </>
    )
}

export default EditProfileForm;