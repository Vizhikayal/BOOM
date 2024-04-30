// Login.jsx

import React, { useState } from 'react';
import Background from '../../assets/image/Background.svg';
import Boom from '../../assets/image/Boom.svg';
import { Form, Button } from "react-bootstrap";
import '../Login/Login.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../Action.jsx"; // Corrected import

function Login({onLogin}) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      login: "",
      password: "",
    });
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleNavigationTo = (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        dispatch(userLogin(formData))
          .then((res) => {
            if (res.payload && res.payload.token) {
              console.log(
                "User logged in successfully",
                res.payload && res.payload.token
              );
              onLogin(true)
              localStorage.setItem("user", res.payload.token);
              console.log("token", res.payload.token);
              navigate("/table");
            } else {
              console.error("Invalid credentials");
              // Handle the invalid credentials scenario, e.g., show an error message to the user
            }
          })
          .catch((error) => {
            console.error("Error logging in:", error);
          });
      }
    };
  
    const handleNavigation = () => {
      navigate("/signup");
    };
  
    const validateForm = () => {
      let valid = true;
      let newErrors = {};
  
      if (!formData.login) {
        newErrors.login = "Username is required";
        valid = false;
      }
  
      if (!formData.password) {
        newErrors.password = "Password is required";
        valid = false;
      }
  
      setErrors(newErrors);
      return valid;
    };
    
    return (
        <div style={{
            height: "100vh",
            background: `url(${Background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            overflow: "hidden",
          }}>
            <div className="Form container" >
            <div className="elements">
                 <img src={Boom} alt="boom" />
                <h4>Merchant Login</h4>
                <p>Enter your account details</p>
                <Form onSubmit={handleNavigationTo}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="login"
                            placeholder="Enter"
                            value={formData.login}
                            onChange={handleInputChange}
                        />
                        {errors.login && <p className="error">{errors.login}</p>}
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                        <div style={{ marginLeft: '10px' }}>
                            <p>Forget password?</p>
                        </div>
                    </Form.Group>
                    <Button className="login" type="submit">Login</Button>
                </Form>
                <div className="sign">
                    <p className="para">Not a Merchant yet?<span onClick={handleNavigation} style={{color:'#FE7720'}}>Sign Up Now</span></p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Login;
