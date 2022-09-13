import React, {useState, useEffect,useContext } from 'react'
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useHistory} from "react-router-dom";
import { AuthContext } from '../Context/auth-context';
import loading from "./loading.gif"
import Spinner from "./Spinner";

export const ResetPassword=()=>{
  const initialValue = { email: "", password: "",otp:"" };
  const [formValues, setFormValues] = useState(initialValue);
    const [otpMode,setOtpMode]=useState(true)
    const [isSubmit,setIsSubmit]=useState(false)
    const [isLoading ,setIsLoading]=useState(false)
    const [fromErrors,setFormErrors]=useState({})
    const auth=useContext(AuthContext)

    const alertconfig = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };

const history=useHistory() 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };


const onhandleSubmit=async(e)=>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if(Object.keys(fromErrors).length===0 && isSubmit && otpMode){
        try {
          setIsLoading(true)
          const response = await fetch(`http://localhost:5000/api/users/emailsend`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: formValues.email,
            })
          });
  
          const responseData = await response.json();
          if (!responseData.message){
            toast.success(`${responseData.success}`,alertconfig)
            setIsLoading(false)
            setOtpMode(false)}
          else{
            setIsLoading(false);
            toast.error(`${responseData.message}`, alertconfig);
  
          }
          }
         catch (err) {
        };
        
        }
        if(Object.keys(fromErrors).length===0 && isSubmit && !otpMode){
          try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:5000/api/users/resetpassword`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: formValues.email,
                otp:formValues.otp,
                password:formValues.password

              })
            });
    
            const responseData = await response.json();
            console.log(responseData)
            if (!responseData.message){
              toast.success(`${responseData.success}`,alertconfig)
              setIsLoading(false)
              setTimeout(function () {
                history.push("/login");
            }, 3000);
            // history.push("/login")
            }
            else{
              setIsLoading(false);
              toast.error(`${responseData.message}`, alertconfig);
    
            }
            }
           catch (err) {
          };
        }
      };


const validate=(values)=>{
    const errors={}
    const regex=/\S+@\S+\.\S+/
    if(!values.email){
        errors.email="Email is Required !"
    }
    else if (!regex.test(values.email)){
        errors.email="Email is not valid !"
    }

    if(!values.password && !otpMode){
        errors.password="Password is Required !"
    }
    else if(values.password.length<8 && !otpMode){
        errors.password="Password must be of atleast 8 characters !"
    }
    else if (!values.otp && !otpMode){
        errors.otp="Otp is Required"
    }
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
          <h2>{otpMode?"Send OTP":"Reset"}</h2>

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
          {!otpMode && <div className="form-group">
            <input
            //   type="email"
              className={`form-control ${fromErrors.otp?"data":""}`}
              name="otp"
              placeholder="Otp"
            //   required="required"
              value={formValues.otp}
              onChange={handleChange}
            />
            <p className="error">{fromErrors.otp}</p>
          </div>}
          {!otpMode &&<div className="form-group">
            <input
              type="password"
              className={`form-control ${fromErrors.password?"data":""}`}
              name="password"
              placeholder="Password (atleast 8 characters)"
            //   required="required"
              value={formValues.password}
              onChange={handleChange}
            />
            <p className="error">{fromErrors.password}</p>
          </div>}
          
          <div className="form-group">
            {/* <button type="submit" className="btn btn-success btn-lg btn-block">
              Login
              
            </button> */}
            <button className="button-33 btn-lg btn-block" type="submit "onClick={onhandleSubmit} role="button">{otpMode?"Send OTP":"Reset Now"}</button>
          </div>
          {!otpMode&&<div style={{"float":"right"}}>
          OTP Expired? <span className='resend' onClick={()=>{setOtpMode(true)}} style={{"color":"black"}}>ResendOTP</span>
        </div>}
          {/* {otpMode &&<a style={{"float":"right"}} href="/forgetpassword">OTP Expired?SendOTP</a>} */}
        </form>
        <div className="text-center">
          Go to? <a href="/login" style={{"color":"black"}}>Login</a>
        </div>
      </div>
      <ToastContainer
        position="top-center"
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
)
};

export default ResetPassword