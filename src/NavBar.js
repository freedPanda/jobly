import React, { useContext, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import {Navbar, Nav, NavItem} from 'reactstrap';
import './NavBar.css'
import AuthContext from './hooks/AuthContext';

function NavBar(){

    //AuthContext has an object storing functions for getting, 
    //setting, and deleting the token
    const auth = useContext(AuthContext);
    //loggedin determines what navitem is displayed or not
    let loggedin = auth['token'];
    return(
        <div>
        <Navbar expand="md">
            <NavLink exact to="/" className="navbar-brand">
            Jobly
            </NavLink>

            <Nav className="ml-auto" navbar>
                <NavItem className={loggedin ? "show":'hidden'}>
                    <NavLink to="/jobs">Jobs</NavLink>
                </NavItem>
                <NavItem className={loggedin ? "show":'hidden'}>
                    <NavLink to='/companies'>Companies</NavLink>
                </NavItem>
                <NavItem className={loggedin ? "show":'hidden'}>
                    <NavLink to='/profile'>Profile</NavLink>
                </NavItem>
                <NavItem className={loggedin ? "show":'hidden'}>
                    <NavLink to='/applications'>Applications</NavLink>
                </NavItem>
                <NavItem className={loggedin ? "show":'hidden'}>
                    <NavLink onClick={()=>{auth['removeToken']('token'); auth['removeUser']('user')}} 
                    to='/logout'>Logout</NavLink>
                </NavItem>
                <NavItem className={loggedin ? "hidden":'show'}>
                    <NavLink to='/loginsignup'>Login/Signup</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
        </div>
    )
}

export default NavBar;