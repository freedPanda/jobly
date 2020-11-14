import React,{useState,useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import { Card, CardBody, CardTitle, CardText, Button, Spinner, Container} from "reactstrap";
import useAxios from './hooks/useAxios';
import AuthContext from './hooks/AuthContext';
import JoblyApi from './Api';

function JobDetails(){
    const {id} = useParams();
    
    const [applying, apply] = useState(false);

    const auth = useContext(AuthContext);

    const [job, setJob] = useAxios({});

    const [applied, setApplied] = useState(false);

    useEffect(()=>{
        async function applyToJob(){
            apply(false);
            try{
                const result = await JoblyApi.postRequest(auth['token'],
                    `jobs/${job.id}/apply`,{username:auth['user'].username});
                if(result.status === 200){
                    updateApplications(result.data);
                    setApplied('applied');
                }
                else if(result.status === 500){
                    console.log(result);
                }
            }catch(e){
                console.log(e);
            }
        }
        async function getJob(){
            try{
                const result = await setJob(auth['token'],`jobs/${id}`);
                setApplicationStatus(result);
            }catch(e){
                console.log(e);
            }
        }
        function setApplicationStatus(job){
            //let hasApplied = 
            //setApplied(auth['user'].applications.find(application => application.job_id === job.id && application.state === 'applied'||'withdrawed'));
            for(let app of auth['user'].applications){
                if(app.job_id === job.id){
                    setApplied(app.state);
                }
            }
        }
        //this is used to update local storage because local storage contains
        //user object that has list of applications
        function updateApplications(application){
            let user = auth['user'];
            user.applications.push(application);
            auth['removeUser']('user');
            auth['setUser']('user',user);
        }
        if(!job.title){
            getJob();
        }
        if(applying){
            applyToJob();
        }
    },[applying,applied,job])

    if(!job.title){
        return(
            <>
            <Card><Spinner color='info'></Spinner>loading..</Card>
            </>
        )
    }

    return(
        <Container fluid={true}>
        <Card>
            <CardBody>
            <div><h4 style={{display:'inline'}}><b>Job Title: </b>{job.title}</h4>
            <h4 style={{display:'inline',float:'right'}}>
                Status: {applied ? applied : 'active'}</h4></div>
              <CardText className="font-italic"><b>Company: </b>{job.company.name}</CardText>
              
              <CardText className="font-italic"><b>Company Handle: </b>{job.company_handle}</CardText>
              <p>
                <b>Salary:</b> ${job.salary}
              </p>
              <p>
                <b>Equity:</b> {job.equity}
              </p>
            </CardBody>
            <Button disabled={applied ? true : false} onClick={()=>apply(true)}>Apply</Button>
          </Card>
          </Container>
    )

}

export default JobDetails;