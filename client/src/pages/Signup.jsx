import React, {useState, useEffect} from "react";
import "../style/style.css";
import { Link, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { motion } from "framer-motion";
import headpones from "../assets/headphones3D.png";
import axios from "axios";

const Signup = (props) => {

    const [values, setValues] = useState({
        username: '',
        email: '',
        pswd: '',
    });

    const navigate = useNavigate();

    const handleInput = async (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }
    

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8800/main')
        .then( res => {
            if(res.data.valid){
                navigate('/main');
            } else{
                navigate('/signup');
            }
        })
        .catch(err => console.log(err))
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post("http://localhost:8800/signup", values)
        .then(res => {
            console.log(res);
            navigate("/login")
        })
        .catch(err => console.log(err));
    }

    return(
        <>
        <div className="home-container">
            <Navbar /> 
            {/* <Form text="Sign in to start listening" 
                info="Don't have an account yet?"
                info2="Register here."/> */}
            <motion.div className="form-container"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.2,  type: 'spring', duration: 2}}>
                <div className="home-form">
                    <form onSubmit={handleSubmit} className="flex flex-wrap">
                        <div className="form-conf">
                        <span className="font-medium text-6xl pb-10">Sign up to start listening</span>
                        <label className="font-medium mb-2">Username</label>
                        <input className="rounded border border-slate-500  h-10 mb-3 pl-3" type="text"
                        onChange={handleInput} name="username" placeholder="username"/>
                        <label className="font-medium mb-2">Adress e-mail</label>
                        <input className="rounded border border-slate-500  h-10 mb-3 pl-3" type="text"
                        onChange={handleInput} name="email" placeholder="name@domena.com"/>
                        <label className="font-medium mb-2">Password</label>
                        <input className="rounded border border-slate-500 h-10 mb-6 pl-3" type="password"
                        onChange={handleInput} name="pswd" placeholder="password"/>
                        <button className="rounded-full h-14 mb-6" type='submit'>Next</button> 
                        <div className="flex flex-row items-center mb-6">
                            <div className="w-1/2 border-t border-white"></div>
                                <span className="mx-3">or</span>
                            <div className="w-1/2 border-t border-white"></div>
                        </div>
                        <div className="text-center">Don you have an account yet? <br /> 
                            <Link to="/login"><span className="underline underline-offset-1">Log in here</span></Link>
                        </div>
                        </div>   
                    </form>      
                </div>
            </motion.div>
        </div>
        </>
    )
};

export default Signup;