import React, {useState, useEffect} from "react";
import "../style/style.css";
import { Link, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { motion } from "framer-motion";
import headpones from "../assets/headphones3D.png";
import axios from "axios";
import hair from "../assets/hair.png"
import Content from "../components/Content";


const Home = () => {
    const navigate = useNavigate();

    const handleInput = async (event) =>{
        setValues(prev => ({...prev, [event.target.username]: [event.target.value]}))
    }

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8800/home')
        .then( res => {
            if(res.data.valid){
                navigate('/main');
            } else{
                navigate('/');
            }
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <>
        <motion.div className="home-container" initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.2,  type: 'spring', duration: 2}}>
            {/* <Navbar />  */}
            <Content />
            {/* <div className="form-container">
                <Link to="/login"><button className="bg-purple w-60 rounded-full h-14 mb-6 mr-2" type='submit'>Login</button></Link>
                <Link to="/signup"><button className="bg-purple w-60 rounded-full h-14 mb-6 ml-2" type='submit'>Sign up</button></Link>
            </div>  */}
        </motion.div>
        </>
    )
};

export default Home;