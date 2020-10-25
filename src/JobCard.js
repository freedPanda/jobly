import React,{useState,useContext,useEffect} from 'react';
import { Card, CardBody, CardText, Button} from "reactstrap";
import AuthContext from './hooks/AuthContext';
import {useHistory} from 'react-router-dom';
import JoblyApi from './Api';

function JobCard({job}){

    //auth is used getting and setting, token and user stored in local storage
    const auth = useContext(AuthContext);

    const history = useHistory();

    const [applied, setApplied] = useState(false);

    //this state is used to store the company name associated with the job.
    //use effect will get the company name.
    const [company,setCompany] = useState("")

    useEffect(()=>{
       //this is used to get the company name
        async function getCompany(){
            try{
                const result = await JoblyApi.getRequest(auth['token'],
                `companies/${job.company_handle}`);
                if(result.status < 400){
                    setCompany(result.data.company.name);
                }
                else{
                    console.log(result);
                }
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
        setApplicationStatus(job);
        getCompany();
    },[])
    if(!company){
        return (
            <></>
        )
    }

    return (
        
          <Card>
            <CardBody>
            <div><h4 style={{display:'inline'}}><b>Job Title: </b>{job.title}</h4>
            <h4 style={{display:'inline',float:'right'}}>
                Status: {applied ? applied: 'active'}</h4></div>
            
              <CardText className="font-italic"><b>Company: </b>{company}</CardText>
            </CardBody>
            <Button style={{width:'150px'}}onClick={()=>history.push(`/jobs/${job.id}`)}>View Job</Button>
          </Card>
        
      );
}

export default JobCard;