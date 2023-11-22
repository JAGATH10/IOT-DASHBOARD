import React from "react";

const LoginInput = (props) =>{
    const loginstyle={
        width:"60vh",
        padding:"16px",
        fontFamily: 'Poppins',
        border: "2px solid lightgray",
        borderRadius: "6px"
    }
    return(
        <div>
            <input placeholder={props.placeholder} type={props.type} name={props.name} required={props.required} style={loginstyle}/>
        </div>
    )
}

export default LoginInput;