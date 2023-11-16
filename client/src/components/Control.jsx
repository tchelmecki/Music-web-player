import React, { useEffect, useState, useRef } from "react";
import "../style/style.css";
import { FaPlay } from 'react-icons/fa';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { TbRepeat } from 'react-icons/tb';
import { LiaRandomSolid } from 'react-icons/lia';
import { PiSpeakerSimpleHighFill } from 'react-icons/pi';
import { PiSpeakerSimpleSlashFill } from 'react-icons/pi';
import { motion } from "framer-motion";
import { FaPause } from "react-icons/fa";
import  music  from "../assets/music1.wav";


const Control = React.memo(() =>{

    //state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // reeferences
    const audioPlayer = useRef(); // reference our audio component
    const progressBar = useRef(); // reference our progress bar
    const animationRef = useRef(); // reference the animation

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes} : ${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if(!prevValue){
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else{
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);

    }

    // const whilePlaying = () => {
    //     if (audioPlayer.current.currentTime < duration) {
    //         progressBar.current.value = audioPlayer.current.currentTime;
    //         changePlayerCurrentTime();
    //         animationRef.current = requestAnimationFrame(whilePlaying);
    //     } else {
    //         setIsPlaying(false);
    //         cancelAnimationFrame(animationRef.current);
    //     }
    // }
    

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
      }
    
      const backFifteen = () => {
        progressBar.current.value = Number(progressBar.current.value - 15);
        changeRange();
      }
    
      const forwardFifteen = () => {
        audioPlayer.current.currentTime += 15;
        changePlayerCurrentTime();
      }

    return(
        <>
        <div className="control-panel"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.2,  type: 'spring', duration: 2}}>
            <audio ref={audioPlayer} src={music}></audio>

            {/* progress bar */}
            <div className="bar-record">
                <span>{calculateTime(currentTime)}</span>
                <div className="bar-container">
                    <input className="progress-bar" type="range"  defaultValue="0" ref={progressBar} onChange={changeRange}/>
                </div>
                {/* {(duration && !isNaN(duration)) &&  */}
                <span>{(duration && !isNaN(duration)) && calculateTime(duration)}</span>
            </div>
            <div className=" w-full  grid grid-cols-3">
            <div></div>
            
            <div className="flex justify-center ">
            {/* back 15s */}
            <button><LiaRandomSolid/></button>
            <button onClick={backFifteen}><AiFillStepBackward/></button>

            {/* play or pause */}
            <button onClick={togglePlayPause} className="play">{ isPlaying ? <FaPause/> : <FaPlay/> }</button>
            
            {/* forward 15s */}
            <button onClick={forwardFifteen}><AiFillStepForward/></button>
            <button><TbRepeat/></button>
            </div>
            
            {/* sound  */}
            <div className="sound flex justify-end items-center pr-10">
            <button><PiSpeakerSimpleHighFill/></button>
            </div>
          
            </div>
        </div>
        </>
    )
});

export default Control;