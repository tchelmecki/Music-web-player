import React from "react";
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import "../style/style.css";

const Navbar = () => {
    return(
        <>
        <div className="home-nav">
            <div className="flex items-center  text-3xl"> <TfiLayoutMediaCenterAlt/><span className="ml-2">Music Player Web</span> </div>
        </div>
        </>
    )
};

export default Navbar;