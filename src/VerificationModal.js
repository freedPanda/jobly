import React,{useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';

function VerificationModal({display,setPassword,resetModal}){
    //modal can be used to verify user is in fact the user
    //hide and show modal
    const [modal,setModal] = useState(false);

    const INIT = {password:""}

    const [form,updateForm] = useState(INIT)

    useEffect(()=>{
        setModal(display);
    },[display]);

    const toggle = () => {
        setModal(!modal);
        resetModal(false);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setPassword(form.password);
    }    
    const handleChange = (evt) => {
        const {name, value} = evt.target;
        updateForm(fData => ({
            ...fData,
            [name]: value
        }));
    }

    return(
        <div>
        <Modal isOpen={modal} >
            <ModalHeader >Verifcation</ModalHeader>
            <ModalBody>
                Enter your password to authorize these changes
            </ModalBody>
            <ModalFooter>
                <Form>
                    <Input onChange={handleChange} type="password" name="password" 
                    id="password"/>
                </Form>
            <Button color="primary" onClick={handleSubmit}>Authorize</Button>{''}
            <Button color="danger" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </div>
    )
}

export default VerificationModal;