import React from "react";
import "../style/style.css";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion"

const Form = (props) =>{

    const location = useLocation();

    const linkTo = location.pathname === '/Signup' ? '/' : '/Signup';
  
    
    return(
        <>
        <motion.div className="form-container"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.2,  type: 'spring', duration: 2}}>
                <div className="home-form">
                    <form action="" className="flex flex-wrap">
                        <div className="form-conf">
                        <span className="font-medium text-6xl pb-10">{props.text}</span>
                        <label className="font-medium mb-2">Adress e-mail</label>
                        <input className="rounded border border-slate-500  h-10 mb-3 pl-3" type="text" placeholder="name@domena.com"/>
                        <label className="font-medium mb-2">Password</label>
                        <input className="rounded border border-slate-500 h-10 mb-6 pl-3" type="password" placeholder="password"/>
                        <button className="rounded-full h-14 mb-6">Next</button> 
                        <div className="flex flex-row items-center mb-6">
                            <div className="w-1/2 border-t border-white"></div>
                                <span className="mx-3">or</span>
                            <div className="w-1/2 border-t border-white"></div>
                        </div>
                        <div className="text-center">{props.info} <br /> 
                            <Link to={linkTo}><span className="underline underline-offset-1">{props.info2}</span></Link>
                        </div>
                        </div>   
                    </form>      
                </div>
            </motion.div>
        </>
    )
};

export default Form;