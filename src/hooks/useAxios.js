import {useState} from 'react';
import JoblyApi from '../Api';

function useAxios(value=false){

    const INITIAL_STATE = [];
    const [thing, updateThing] = useState(value?value:INITIAL_STATE);

    //used for getting all items of a given type i.e. jobs or companys
    const getItems = async (token, endpoint, term=false) => {
        const result = await JoblyApi.getRequest(token,endpoint,term);
        
            if(result.status === 404){
                updateThing(false);
            }
            else{
                updateThing(item => [...result.data[endpoint] ? result.data[endpoint] : [result.data]]);
            }
    };
    
    //used for adding an item of any type i.e. snacks or drinks
    const addItem = async (token,endpoint,obj) => {
        //const response = await SnackOrBoozeApi.addItem(item, type);
        const result = await JoblyApi.postRequest(token,endpoint,obj);
        updateThing(item => [...thing, {...result.data}]);
    }

    //for when the requested resource is a single object
    const getObject = async (token, endpoint, term=false) => {
        const result = await JoblyApi.getRequest(token,endpoint,term);
            console.log('result', result.data)
            if(result.status === 404){
                updateThing(false);
            }
            else{
                updateThing({...result.data.job});
                return result.data.job;
            }
    };
    //returning getObject instead of getItems because the resource is a single object
    if(value instanceof Object){
        return [thing,getObject];
    }

    return [thing,getItems,addItem];

}

export default useAxios;