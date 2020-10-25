import React,{useState, useContext} from 'react';
import {Card, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import AuthContext from './hooks/AuthContext';
import {useHistory} from 'react-router-dom';

function SearchBar({type, search}){
    const [term, setTerm] = useState("");
    const auth = useContext(AuthContext);
    const history = useHistory();

    const handleChange = (evt) =>{
        const {value} = evt.target;
        setTerm(value);
    }

    const handleSubmit = (evt) =>{
        evt.preventDefault();
        search(auth['token'],type.toLowerCase(),term);
        
    }

    let searchPlaceholder = "Search " + type + "...";

    return(
        <Card>
            <Form inline onSubmit={handleSubmit}>
            <div style={{width:"100%",height:"35px",display:'flex'}}>
                <Input onChange={handleChange} placeholder={searchPlaceholder} 
                type='text' name="term" id="term"
                style={{width:"100%",display:"inline-flex"}}required/>
                <Button style={{width:"100px"}}color='primary'>Submit</Button>
            </div>
            
            </Form>
        </Card>
    )
}

export default SearchBar;