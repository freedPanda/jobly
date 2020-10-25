import React, {useEffect, useContext, useState} from 'react';
import {Card, Button,CardBody, CardTitle, CardImg } from "reactstrap";
import AuthContext from './hooks/AuthContext';
import useToggle from './hooks/useToggle';
import './NavBar.css';
import {useHistory} from 'react-router-dom';
import EditProfileForm from './EditProfileForm';
import VerificationModal from './VerificationModal';
import JoblyApi from './Api';
import DeleteErrors from './FormErrors';

function Profile(){

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [user, setUser] = useState(auth['user']);

    const [displayForm,toggleForm] = useToggle(false);

    const [modal, setModal] = useState(false);

    const [password, setPassword] = useState(false);

    const [deleteErrors, setDeleteErrors] = useState([]);

    useEffect(()=>{
        async function deleteUser(){
            const result = await JoblyApi.deleteRequest(auth['token'],
            `users/${auth['user'].username}`,{password:password});
            setPassword(false);
            setModal(false);
            console.log(result);
            if(result.data.message === 'User deleted'){
                auth['removeToken']('token');
                auth['removeUser']('user');
                history.push('/');
            }
            else if(result.status === 401){
                setDeleteErrors([result.data.message])
            }
            else{
                // errors
                setDeleteErrors([result.data.message]);
            }
        }
        if(password){
            deleteUser();
        }
    },[password])


    return(
        <Card>
            <DeleteErrors classname={deleteErrors ? 'show':'hidden'} 
            errors={deleteErrors}/>
           <div style={{width:'100%', display:'flex'}}>
                <CardImg top style={{width:'100px'}}
                src={user.photo_url} alt={"Profile Picture"}/>
                <CardBody>
                    <CardTitle className="font-weight-bold text-start">
                        Username: {user.username}
                    </CardTitle>
                    <p>
                        <b>Firstname: </b>{user.first_name}
                    </p>
                    <p>
                        <b>Lastname: </b>{user.last_name}
                    </p>
                    <p>
                        <b>Email: </b>{user.email}
                    </p>
                </CardBody>
            </div>
            <div style={{textAlign:"end",borderTop:"3px solid grey"}}>
                <Button onClick={toggleForm}style={{width:'150px',margin:".3rem"}}>Edit Profile</Button>
                <Button onClick={()=>setModal(true)}color="danger" style={{width:'150px',margin:".3rem"}}>Delete Profile</Button>
            </div>
            <EditProfileForm user={user} className={displayForm ? 'show' : 'hidden'} setUser={setUser}/> 
            <VerificationModal display={modal} resetModal={setModal} setPassword={setPassword}/>
       </Card> 
    )

}

export default Profile;