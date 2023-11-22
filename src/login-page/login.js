import React, { useState } from 'react';
import './login.css';
import LoginInput from './login-components/loginInput';
import ToggleLoginInput from './login-components/toggleLoginInput';
import { NavLink } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  const linkstyle ={color: "darkBlue",fontFamily:"Poppins"} ;
  return (
    
    <div className='login-container'>
      <div className='Form-container'>
        <div className='Form-entries'>
          <div>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Poppins'/>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Montserrat'/>
          </div>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <br/>
            <LoginInput placeholder="Please Enter your Email" required="required" type="email" name="Email" value={email} onChange={handleEmailChange}/>
            <br/>
            <label>Password</label>
            <br/>
            <ToggleLoginInput placeholder="Please Enter your Password" required="required" name="Password" value={password} onChange={handlePasswordChange}/>
            <br/>
            <NavLink to="/Dashboard" className="buttonid">Login</NavLink><br/><br/>
          </form>
          <NavLink to="/Registerpage" style={linkstyle}>register your account</NavLink>
        </div>
      </div>
      <div className='Img-container'><h1>Connecting<br/> the World,<br/> with the<br/> power of IOT Devices</h1></div>
    </div>
  );
};

export default LoginPage;
