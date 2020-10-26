import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {

    static async login(user){
        try{
            const result = await axios.post(`${BASE_API_URL}login`,user);
            return result.data.loginData;
        }catch(error){
            console.log(error,'api');
            return false;
        }
        
    }

    static async signup(user){
        try{
            const result = await axios.post(`${BASE_API_URL}/users`,user);
            return result;
        }catch(e){
            if(e.response.status === 409){
                return e.response;
            }
            else if(e.response.status === 400){
                let errors = JoblyApi.prepareErrors(e.response.data.message);
                return errors;
            }
            return e.response;
        }
    }

    static async getRequest(token,endpoint,term){
        try{
            if(term){
                const searchResult = await axios.get(`${BASE_API_URL}/${endpoint}`,{params:{_token:token,search:term}});
                return searchResult;
            }
            const result = await axios.get(`${BASE_API_URL}/${endpoint}`,
            {params:{_token:token}});
            return result;
        }catch(e){
            console.log(e.response,'error in get req');
            return e.response;
        }
    }

    static async postRequest(token,endpoint,obj){
        try{
            const result = await axios.post(`${BASE_API_URL}/${endpoint}`,{_token:token,...obj});
            return result;
        }catch(e){
            return e.response;
        }
    }

    //for a patch request there needs to be a username or company handle
    //in the endpoint variable
    static async patchRequest(token,endpoint,obj){
        try{
            const result = await axios.patch(`${BASE_API_URL}/${endpoint}`,
            {_token:token,...obj});
            return result;
        }catch(e){
            if(e.response.status === 409){
                return e.response;
            }
            else if(e.response.status === 400){
                let errors = JoblyApi.prepareErrors(e.response.data.message);
                return errors;
            }
            else{
                return e.response;
            }
        }
    }

    static async deleteRequest(token,endpoint,obj){
        console.log('delete', {params:{token,...obj}})
        try{
            const result = await axios.delete(
                `${BASE_API_URL}/${endpoint}`,{params:{_token:token,...obj}})
            return result;
        }catch(e){
            return e.response;
        }
    }

    static prepareErrors(errors){
        let retArr = [];
        for(let error of errors){
            let s = error.split('.');
            retArr.push(s[1]);
        }
        return retArr;
    }

    static async request(endpoint, paramsOrData = {}, verb = "get") {
        paramsOrData._token = ( // for now, hardcode token for "testing"
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
        "3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30." +
        "COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U");
    
        console.debug("API Call:", endpoint, paramsOrData, verb);
    
        try {
          return (await axios({
            method: verb,
            url: `http://localhost:3001/${endpoint}`,
            [verb === "get" ? "params" : "data"]: paramsOrData})).data;
            // axios sends query string data via the "params" key,
            // and request body data via the "data" key,
            // so the key we need depends on the HTTP verb
        }
    
        catch(err) {
          console.error("API Error:", err.response);
          let message = err.response.data.message;
          throw Array.isArray(message) ? message : [message];
        }
      }

}

export default JoblyApi;