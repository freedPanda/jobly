import React, { useEffect, useContext} from 'react';
import useAxios from './hooks/useAxios';
import AuthContext from './hooks/AuthContext';
import {v4 as uuid} from 'uuid';
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
import {Button,Container} from 'reactstrap';

function Companies(){

    const auth = useContext(AuthContext);

    const [companies, setCompanies, addCompany] = useAxios();

    useEffect(()=>{
        async function getCompanies(){
            try{
                await setCompanies(auth['token'],'companies');
                
            } catch(error){
                console.log(error);
            }
        }
        getCompanies();
    }, [])

    return(
        <Container fluid={true} style={{textAlign:'center'}}>
            <Button onClick={()=>{setCompanies(auth['token'],'companies'); }}
            style={{width:"200px",marginBottom:"20px"}}>Back to All Companies</Button>

            <h2 style={{color:'black'}}>Companies</h2>
            <SearchBar type={'Companies'} search={setCompanies}/>
        
            {companies.map(company =>(
                <CompanyCard key={uuid()} company={company}/>
            ))}
        </Container>
    )

}

export default Companies;