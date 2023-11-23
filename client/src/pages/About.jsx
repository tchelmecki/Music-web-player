import React from 'react';
import Left from '../components/Left';
import foto from '../assets/tomasz.jpg';
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const About = () => {
  return (
    <>
    <Left />
    <div className='container-about'>
        <div className='about-foto'>
            <div className='about'>
                <span className="text-3xl mb-2">about.</span>
                <span className='flex items-center text-xl'><FaGithub /> GitHub</span>
                <span className='flex items-center text-xl'><MdEmail /> email</span>
            </div>
            <div className='foto-container'>
               
            </div>
        </div>
    </div>
    </>
  )
}

export default About