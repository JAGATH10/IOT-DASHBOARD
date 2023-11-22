import React, { useState } from 'react';
import './register.css';
import LoginInput from './login-components/loginInput';
import ToggleLoginInput from './login-components/toggleLoginInput';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className='login-container1'>
      <div>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Poppins'/>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Montserrat'/>
        <div className='Img-container1'><h1>Connecting<br/> the World,<br/> with the<br/> power of IOT Devices</h1></div>
      </div>
      <div className='Form-container1'>
        <div className='Form-entries1'>
          <h2>Register your account</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <br/>
            <LoginInput placeholder="Please Enter your Email" required="required" type="email" name="Email" value={email} onChange={handleEmailChange}/>
            <br/>
            <label>Password</label>
            <br/>
            <ToggleLoginInput placeholder="Please Enter your Password" required="required" name="Password" value={password} onChange={handlePasswordChange}/>
            <br/>
            <label>Confirm Password</label>
            <br/>
            <ToggleLoginInput placeholder="Please Confirm Password" required="required" name="Confirmpassword" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
            {password !== confirmPassword ?<p>password does not match</p>:<p></p>}
            <button>Submit</button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
