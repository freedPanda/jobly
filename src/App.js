import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import AuthContext from './hooks/AuthContext';
import Home from './Home';
import LoginSignUp from './LoginSignup';
import Logout from './Logout';
import Jobs from './Jobs';
import Companies from './Companies';
import Profile from './Profile';
import CompanyDetails from './CompanyDetails';
import Applications from './Applications';
import JobDetails from './JobDetails';

function App() {
  /**
   * useLocalStorage to see if user is logged in or not.
   * accepts two values. first to find the token, second to 
   * set init value if token not found or error. using state here for tracking
   * login or logout makes sense because the
   */
  const [token,setToken,removeToken] = useLocalStorage('token',false);
  const [user,setUser,removeUser] = useLocalStorage('user',"");

  

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{'token':token,'setToken':setToken,'removeToken':removeToken,
      'user':user,'setUser':setUser,'removeUser':removeUser}}>
          <NavBar />
            <main>
              <Switch>
                <Route exact path='/'>
                  <Home/>
                </Route>
                <Route exact path='/loginsignup'>
                  <LoginSignUp/>
                </Route>
                <Route exact path='/logout'>
                  <Logout/>
                </Route>
                <Route exact path='/jobs'>
                  <Jobs/>
                </Route>
                <Route exact path='/companies'>
                  <Companies/>
                </Route>
                <Route exact path='/profile'>
                  <Profile />
                </Route>
                <Route exact path='/applications'>
                  <Applications />
                </Route>
                <Route path='/companies/:handle'>
                  <CompanyDetails />
                </Route>
                <Route path='/jobs/:id'>
                  <JobDetails />
                </Route>
                <Route>
                  <p>Cant find that page</p>
                </Route>
              </Switch>
            </main>
          </AuthContext.Provider>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
