import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Background from "../../assets/image/Background.svg";
import Boom from "../../assets/image/Boom.svg";
import { useNavigate } from "react-router-dom";
import "../Signup/Signup.scss";
import PhoneNumberList from "../dropdown";
import { useDispatch } from "react-redux";
import { customerLogin } from "../Action";


function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    business_legal_name: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handlePhoneNumberChange = (value) => {
    const { country_code, number } = value;
    setFormData({
      ...formData,
      phone_number: {
        country_code: country_code,
        number: number.replace(/\s/g, ""),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully!");
      // Here, you can dispatch your addUser action or any other logic
      handleRegistration(); // Handle user registration
    }
  };

 const handleRegistration = () => {
  dispatch(customerLogin(formData))
    .then((res) => {
      console.log("User registered successfully");
      localStorage.setItem('User', res.payload.token);
      // navigate('/');
    })
    .catch((err) => {
      console.error("Error registering user:", err);
    });
};

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.business_legal_name?.trim()) {
      newErrors.business_legal_name = "Legal name is required";
      valid = false;
    }

    if (!formData.username?.trim()) {
      newErrors.username = "User handle is required";
      valid = false;
    }

    if (!formData.email?.trim() || !validateEmail(formData.email)) {
      newErrors.email = "Valid email is required";
      valid = false;
    }

    if (!formData.phone_number?.number?.trim()) {
      newErrors.phone_number = "Phone number is required";
      valid = false;
    }

    if (!formData.password?.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.trim().length < 8) {
      newErrors.password = "Password should be at least 8 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="image" style={{ backgroundImage: `url(${Background})` }}>
      <div className="Form container">
        <div className="Elements">
          <img src={Boom} alt="boom" />
          <h2>Merchant Signup</h2>
          <p>Enter your account details</p>
          <form onSubmit={handleSubmit}>
            <div className="form-page">
              <label htmlFor="business_legal_name">Business Legal Name</label>
              <input
                id="business_legal_name"
                type="text"
                name="business_legal_name"
                value={formData.business_legal_name}
                onChange={handleInputChange}
                placeholder="Enter"
              />
              {errors.business_legal_name && <p className="error error-red">{errors.business_legal_name}</p>}
            </div>
            <div className="form-page">
              <label htmlFor="username">User Handle</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter"
              />
              {errors.username && <p className="error error-red">{errors.username}</p>}
            </div>
            <div className="form-page">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter"
              />
              {errors.email && <p className="error error-red">{errors.email}</p>}
            </div>
            <div className="form-page">
              <label htmlFor="phone_number">Phone Number</label>
              <div className="List">
                <PhoneNumberList onPhoneNumberChange={handlePhoneNumberChange} />
                {errors.phone_number && <div className="text-danger">{errors.phone_number}</div>}
              </div>
              {errors.phone_number && <p className="error error-red">{errors.phone_number}</p>}
            </div>
            <div className="page">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter"
                />
                <button type="button" className="password-toggle-button" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="error error-red">{errors.password}</p>}
            </div>
            <button className="btn" type="submit">
              Register
            </button>
          </form>
          <div className="sign-up">
            <p>
              Already have an account? <span style={{ color: "#FE7720", cursor: "pointer" }} onClick={handleLogin}>Login Now</span>
            </p>
          </div>
          <div>
            <p className="Login">
              By creating an account, you agree to the <span style={{ color: "#FE7720" }}>Terms and Conditions</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
