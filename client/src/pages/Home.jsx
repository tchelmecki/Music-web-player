import React from "react";
import "../style/style.css";
import { Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Form from "../components/Form";

const Home = (props) => {
    return(
        <>
        <div className="home-container">
            <Navbar />
            <Form text="Sign in to start listening" 
                info="Don't have an account yet?"
                info2="Register here."/>
        </div>
        </>
    )
};

export default Home;