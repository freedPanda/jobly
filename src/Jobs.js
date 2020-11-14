import React, { useEffect, useContext, useState} from 'react';
import useAxios from './hooks/useAxios';
import AuthContext from './hooks/AuthContext';
import {v4 as uuid} from 'uuid';
import JobCard from './JobCard';
import SearchBar from './SearchBar';
import {Button, Jumbotron} from 'reactstrap';
import {useHistory} from 'react-router-dom';

function Jobs(){

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [jobs, setJobs, addJob] = useAxios();

    useEffect(()=>{
        async function getJobs(){
            try{
                await setJobs(auth['token'],'jobs');
            } catch(error){
                console.log(error);
            }
        }
        getJobs();
    }, [])

    if(!auth['token']){
        return(
            <Jumbotron>
                <h1>Not Authorized. Please login or sign up.</h1>
                <Button onClick={()=>history.push('/loginsignup')}>Login/Signup</Button>
            </Jumbotron>
        )
    }

    return(
        <>
            <Button onClick={()=>{setJobs(auth['token'],'jobs')}}
            style={{width:"10rem",height:'2.5rem',marginBottom:"20px"}}>Back to All Jobs</Button>

            <h2 style={{color:'black'}}>Jobs</h2>
            <SearchBar type={'Jobs'} search={setJobs}/>
        
            {jobs.map(job =>(
                <JobCard key={uuid()} job={job}/>
            ))}
        </>
    )

}

export default Jobs;