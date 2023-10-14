import React from "react";
import "../style/style.css";
import { FaPlay } from 'react-icons/fa';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { TbRepeat } from 'react-icons/tb';
import { LiaRandomSolid } from 'react-icons/lia';
import { PiSpeakerSimpleHighFill } from 'react-icons/pi';
import { PiSpeakerSimpleSlashFill } from 'react-icons/pi';




// TbRepeatOff
// TbRepeatOnce

const Control = () =>{
    return(
        <>
        <div className="control-panel">
            <div className="bar-record">
                <span>00:00:00</span>
                <div className="bar-container">
                    <div className="bar"> <div className="dot"></div></div>
                </div>
            </div>
            <div className=" w-full  grid grid-cols-3">
            <div></div>
            <div className="flex justify-center ">
            <button><LiaRandomSolid/></button>
            <button><AiFillStepBackward/></button>
            <button className="play"><FaPlay/></button>
            <button><AiFillStepForward/></button>
            <button><TbRepeat/></button>
            </div>
            
            <div className="flex justify-end items-center pr-20">
            <button><PiSpeakerSimpleHighFill/></button>
            </div>
          
            </div>
        </div>
        </>
    )
};

export default Control;