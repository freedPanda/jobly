import React,{useState,useContext, useEffect} from 'react';
import {Card,CardBody,Button,Container, CardHeader, CardText,CardSubtitle} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import AuthContext from './hooks/AuthContext';
import JoblyApi from './Api';

function Application({application}){
    /**displays a single application */

    const auth = useContext(AuthContext);

    const history = useHistory();

    const [job,setJob] = useState({title:"",company:"",salary:"",status:""});

    const [unapplied,setUnapplied] = useState(false);

    useEffect(()=>{
        async function getJob(){
            const result = await JoblyApi.getRequest(auth['token'],`jobs/${application.job_id}`);
            if(result.status === 200){
                let j = result.data.job;
                setJob({title:j.title,company:j.company.name,salary:j.salary,status:application.state});
            }
        }
        async function unapply(){
            setUnapplied(false);
            const result = await JoblyApi.patchRequest(auth['token'],
            `jobs/${application.job_id}/withdraw`);
            if(result.status === 200){
                let {message} = result.data;
                updateStatus(message);
            }
            else{
                console.log(result,'error');
            }
        }
        //since local storage is used for this component, it must be updated.
        function updateStatus(status){
            let user = auth['user'];
            for(let app of user.applications){
                if(app.job_id === application.job_id){
                    app.state = status;
                }
            }
            //update local storage
            //auth['removeUser']('user');
            //auth['setUser']('user',user);
        }

        getJob();
        
        if(unapplied){
            unapply();
        }
    },[unapplied])

    return(
        <Container fluid={true} style={{textAlign:'center'}}>
        
        <Card>
            <CardHeader>
            <div><h4 style={{display:'inline',float:'left'}}><b>Job Title: </b>{job.title}</h4>
            <h4 style={{display:'inline',float:'right'}}>Status: {job.status}</h4></div>
            </CardHeader>
            <CardBody>
                    <CardSubtitle style={{float:'left', textAlign:'left',width:'100%'}}>
                            <b>Company: </b>{job.company}
                        </CardSubtitle>
                        <CardSubtitle style={{float:'left',textAlign:'left',width:'100%'}}>
                            <b>Salary: </b>${job.salary}
                        </CardSubtitle>
            </CardBody>
            <div style={{margin:'5px',textAlign:'left'}}>
                <Button color={job.status==='withdrawed'?'secondary':'danger'} 
                disabled={job.status === 'withdrawed'?true:false} style={{marginRight:'5px'}} onClick={()=>setUnapplied(true)}>
                    UnApply
                </Button>

                <Button color='primary' onClick={()=>history.push(`jobs/${application.job_id}`)}>
                    View Job
                </Button>
            </div>
            </Card>
        </Container>
    )
}
export default Application;