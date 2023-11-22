import React, { useState } from "react";
import visibility from './visibility.png';

const ToggleLoginInput = (props) => {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPasswordInput(value);
    props.onChange(value); // Call the onChange callback function with the new password value
  };

  const togglePassword = (event) => {
    event.preventDefault();
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const togId = {
    display: "flex",
    flexDirection: "row",
    border: "2px solid lightgray",
    borderRadius: "6px"
  };

  const togInput = {
    width: "50vh",
    padding: "16px",
    fontFamily: 'Poppins',
    border: "none"
  };

  const toggle = {
    width: "9vh",
    height: "57px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "0"
  };

  const toggleImg = {
    width: "30px",
    height: "30px",
    padding: "0",
    margin: "0"
  };

  return (
    <div style={togId}>
      <input placeholder={props.placeholder} type={passwordType} onChange={handlePasswordChange} name={props.name} required={props.required} style={togInput} value={passwordInput}/>
      <button style={toggle} onClick={togglePassword}>
        <img src={visibility} style={toggleImg} alt="failed" />
      </button>
    </div>
  );
};

export default ToggleLoginInput;
