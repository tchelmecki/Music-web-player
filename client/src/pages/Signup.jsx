import React from "react";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import "../style/style.css";

const Signup = () =>{
    return(
        <>
        <div className="home-container">
            <Navbar />
            <Form text="Sign up to start listening" 
                info="Do you already have an account?"
                info2="Log In here."/>
        </div>
            
        </>
    )
};

export default Signup;