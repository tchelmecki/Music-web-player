import React from 'react';
import Left from '../components/Left';
import foto from '../assets/tomasz.jpg';
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";


const About = () => {
  return (
    <>
    <Left />
    <motion.div className='container-about'
    initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.2,  type: 'spring', duration: 2}}>
        <div className='about-foto'>
            <div className='about'>
                <span className="text-6xl mb-2">about me.</span>
                <span className='mb-2'>
                <p className='text-xl'>Tomasz Chełmecki</p>
                <p className='text-xl'>student: 3rd year  </p>
                <p className='text-xl'>tech used: React.JS, Vite, CSS3, Tailwind CSS,</p>
                <p className='text-xl'>Node.JS, Express.JS, MySQL (MariaDB)</p>
                </span>
                <p className='text-xl mb-1'>contact me:</p>
                <div className='flex items-center'>
                  <a href="https://github.com/tchelmecki">
                  <span className='flex items-center text-3xl mr-2'><FaGithub className='icons-about' /></span></a> 
                  <a href="https://github.com/tchelmecki">
                  <span className='flex items-center text-3xl mr-2'><FaDiscord className='icons-about' /></span></a> 
                  <a href="https://github.com/tchelmecki">
                  <span className='flex items-center text-3xl mr-2'><FaInstagram className='icons-about' /></span></a> 
                  <span className='flex items-center text-3xl'><MdEmail className='icons-about'/></span>
                </div>

            </div>
            <div className='foto-container'>
               
            </div>
        </div>
    </motion.div>
    </>
  )
}

export default About