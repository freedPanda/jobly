import React,{useEffect,useState, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, CardImg, Container } from "reactstrap";
import AuthContext from './hooks/AuthContext';
import JoblyApi from './Api';
import JobCard from './JobCard';
import {v4 as uuid} from 'uuid';
import useToggle from './hooks/useToggle';
import { Jumbotron, Button } from 'reactstrap';

function CompanyDetails(){

    const {handle} = useParams();
    let init = {logo_url:"",name:"",handle:"",description:"",num_employees:"",jobs:[]}

    const [company,setCompany] = useState(init);

    //display not found jumbotron
    const [notFound,toggle] = useToggle(false);

    const auth = useContext(AuthContext);

    const history = useHistory();

    useEffect(()=>{
        async function getCompany(){
            try{
                
                const result = await JoblyApi.getRequest(auth['token'],`companies/${handle}`);
                if(result.status === 404){
                    toggle();
                }
                else{
                    setCompany(result.data.company);
                }
                
            }catch(e){
                console.log('in error')
                console.log(e);
            }
        }
        getCompany();
    },[]);

    if(notFound){
        return(
            <Jumbotron>
                <h1 className="display-3">Not Found</h1>
                <p className="lead">We didn't find the company you searched for...</p>
                <hr className="my-2" />
                <p className="lead">
                <Button onClick={()=>{history.push('/companies')}}color="primary">View Companies</Button>
                </p>
            </Jumbotron>
        )
    }

    return(
        <Container fluid={true}>
        
        <Card>
        <div style={{textAlign:'left'}}>
            <h3 style={{color:'black',display:'inline',float:'left', margin:'10px'}}>{company.name}</h3>
        </div>
            <div style={{width:'100%',display:'flex'}}>
                <CardImg style={{width:"300px"}} src={company.logo_url} alt="Company Logo"/>
                
                <CardBody >
                    <CardTitle className="font-weight-bold text-start">
                        {company.name}
                    </CardTitle>
                    <CardText className="font-italic"><b>Handle: </b>{company.handle}</CardText>
                    <p>
                        <b>About: </b>{company.description}
                    </p>
                    <p>
                        <b>Size: </b>{company.num_employees} Employees
                    </p>
                    
                </CardBody>
            </div>
        </Card>
        <h5>Job Openings</h5>
            {company.jobs.map(job=>(
                job.company_handle = handle,
                <JobCard key={uuid()} job={job}/>
        ))}
        </Container>
    )

}

export default CompanyDetails;