import React, { useContext, useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { useHttpClient } from "../Context/http-hooks";
import "./Signup.css";
import { AuthContext } from '../Context/auth-context';
import Alert from "./Alert";
import loading from "./loading.gif"
import Spinner from "./Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const initialValue = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValue);
   const [fromErrors,setFormErrors]=useState({})
   const [isSubmit,setIsSubmit]=useState(false)
   const auth=useContext(AuthContext)
   const [isLoading ,setIsLoading]=useState(false)


   const alertconfig = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const history=useHistory();
  const onhandleSubmit = async(e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if(Object.keys(fromErrors).length===0 && isSubmit){
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:5000/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formValues.email,
            password: formValues.password
          })
        });

        const responseData = await response.json();
        if (!responseData.message){
          auth.login(responseData.token)
          setIsLoading(false)
        history.push("/")}
        else{
          setIsLoading(false);
          toast.error(`${responseData.message}`, alertconfig);

        }
        }
       catch (err) {
      };
      
      }
    }

    

 const validate=(values)=>{
    const errors={}
    const regex=/\S+@\S+\.\S+/
    if(!values.email){
        errors.email="Email is Required !"
    }
    else if (!regex.test(values.email)){
        errors.email="Email is not valid !"
    }

    if(!values.password){
        errors.password="Password is Required !"
    }
    else if(values.password.length<8){
        errors.password="Password must be of atleast 8 characters !"
    };
  return errors;
 };
 
useEffect(()=>{
  if (auth.isLoggedIn){
    history.push("/")
  }
})

  return (
    <React.Fragment>
      <div className="signup-form">
        {isLoading &&<Spinner image={loading}/>}
        <form>
        {/* <a style={{"float":"right"}} href="/forgetpassword">forgetpassword?</a> */}
          <h2>Login</h2>
          {/* <a style={{"float":"right"}} href="/forgetpassword">forgetpassword?</a> */}
          <div className="form-group">
            <input
            //   type="email"
              className={`form-control ${fromErrors.email?"data":""}`}
              name="email"
              placeholder="Email"
            //   required="required"
              value={formValues.email}
              onChange={handleChange}
            />
            <p className="error">{fromErrors.email}</p>
          </div>
          <div className="form-group">
            <input
              type="password"
              className={`form-control ${fromErrors.password?"data":""}`}
              name="password"
              placeholder="Password(atleast 8 characters)"
            //   required="required"
              value={formValues.password}
              onChange={handleChange}
            />
            <p className="error">{fromErrors.password}</p>
          </div>
          
          <div className="form-group">
            {/* <button type="submit" className="btn btn-success btn-lg btn-block">
              Login
              
            </button> */}
            <button className="button-33 btn-lg btn-block" type="submit "onClick={onhandleSubmit} role="button">Login Now</button>
          </div>

          <a style={{"float":"right"}} href="/forgetpassword">ForgetPassword?</a>
        </form>
        <div className="text-center">
          Donot have an account? <a href="/signup" style={{"color":"black"}}>Register</a>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
};

export default LoginPage;
