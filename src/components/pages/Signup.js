import React,{useState,useContext,useEffect} from "react";
import {useHistory} from "react-router-dom";

import { AuthContext } from '../Context/auth-context';
import loading from "./loading.gif";
import Spinner from "./Spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Signup.css";

const Signup = () => {
  const initialValue = { email: "", password: "",firstname:"",lastname:"",confirmpassword:"" };
  const [formValues, setFormValues] = useState(initialValue);
  const [fromErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const auth=useContext(AuthContext);
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

  let history=useHistory();
  const onhandleSubmit = async(e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if(Object.keys(fromErrors).length===0 && isSubmit){
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/users/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstname:formValues.firstname,
            lastname:formValues.lastname,
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

  };



  const validate = (values) => {
    const errors = {};
    const regex = /\S+@\S+\.\S+/;
    if (!values.firstname){
        errors.firstname="Firstname is Required !"
    }
    if (!values.lastname){
        errors.lastname="Lastname is Required !"
    }
    
    if (!values.email) {
      errors.email = "Email is Required !";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not valid !";
    }

    if (!values.password) {
      errors.password = "Password is Required !";
    } else if (values.password.length < 8) {
      errors.password = "Password must be of atleast 8 characters !";
    }
    else if(values.password!==values.confirmpassword){
        errors.confirmpassword="Password do not match !"
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
        <form action="" method="post" onSubmit={onhandleSubmit}>
          <h2>Register</h2>
          <p className="hint-text">
            Create your account. It's free and only takes a minute.
          </p>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className={`form-control ${fromErrors.firstname?"data":""}`}
                  name="firstname"
                  placeholder="First Name"
                //   required="required"
                  value={formValues.firstname}
                  onChange={handleChange}
                />
                <p className="error">{fromErrors.firstname}</p>
              </div>
              <div className="col">
                <input
                  type="text"
                  className={`form-control ${fromErrors.lastname?"data":""}`}
                  name="lastname"
                  placeholder="Last Name"
                //   required="required"
                  value={formValues.lastname}
                  onChange={handleChange}
                />
                <p className="error">{fromErrors.lastname}</p>
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              type="email"
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
            <input
              type="password"
              className={`form-control ${fromErrors.confirmpassword?"data":""}`}
              name="confirmpassword"
              placeholder="Confirm Password"
            //   required="required"
              value={formValues.confirmpassword}
              onChange={handleChange}
            />
            <p className="error">{fromErrors.confirmpassword}</p>
          </div>
          <div className="form-group">
            {/* <button type="submit" className="btn btn-success btn-lg btn-block">
              Register Now
            </button> */}
            <button className="button-33 btn-lg btn-block" type="submit "role="button">Register Now</button>
          </div>
        </form>
        <div className="text-center">
          Already have an account? <a href="/login" style={{"color":"black"}}>Sign in</a>
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

export default Signup;
