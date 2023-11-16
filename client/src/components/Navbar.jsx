import React from "react";
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import "../style/style.css";
import { motion } from "framer-motion"

const Navbar = () => {
    return(
        <>
        <div className="home-nav"
             initial={{ opacity: 0}}
             animate={{ opacity: 1}}
             transition={{ delay: 0.2, duration: 1}}>
            <div className="flex items-center  text-3xl"> <TfiLayoutMediaCenterAlt/><span className="ml-2">Music Player Web</span> </div>
        </div>
        </>
    )
};

export default Navbar;