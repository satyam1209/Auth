import React, { useContext } from 'react'
import { AuthContext } from '../Context/auth-context';
import "./Front.css"
import { NavLink } from 'react-router-dom';
import Spinner from './Spinner';
import hello from "./hello-gif-1.gif"
// import Hello from './Spinner';
const FrontPage=()=>{
    const auth = useContext(AuthContext);
    return (
        <div className="flex-container">
        <ul style={{"margin-top":"5rem"}}>
        
        { auth.isLoggedIn &&(<li><h2> <b style={{"color":"black"}}>You are now Logged in Thankyou</b> </h2></li>) }

        { auth.isLoggedIn &&<Spinner image={hello} style={{"width":"100%","height":"20rem"}}/>}
        
        
        {auth.isLoggedIn||(<li><h2> <b style={{"color":"red"}}> You have not Logged in.Please <NavLink exact to="/login">Login</NavLink></b> </h2></li>)}
        

        </ul>
        </div>
    )
}

export default FrontPage;