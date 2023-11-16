import React from "react";
import "../style/style.css";
import contentImage from "../assets/content-image.png";
import { BiFolder } from 'react-icons/bi';
import { FaRegSmileBeam } from 'react-icons/fa';
import { motion } from "framer-motion";


const Content = () => {
    return(
        <>
        
        <div className="content "
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ delay: 0.2,  type: 'spring', duration: 2}}>
            <div className="flex justify-end items-center w-1/2 h-full pr-10">
            <div className="girl mr-20">
            </div>
            </div>
            <div className="info flex items-center w-1/2 h-full">
                <div className="info-text flex flex-col">
                <span className="tag">Music Player Web</span>
                <span>Use this app to play your favourite song and explore <br /> your personal libraries. Enjoy!</span>
                <button className="btn-file w-40 h-10 mt-3 border-none rounded-md">
                    <span className="flex justify-center items-center"><BiFolder className="mr-1"/>Open file(s)</span>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
};

export default Content;