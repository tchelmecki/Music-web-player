import React from 'react';
import "../style/style.css";
import { motion } from "framer-motion";

const AddSong = ({open, onClose}) => {
  
    if(!open) return null;
  return (
    <motion.div className='overlay'
    initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 0.1,  type: 'spring', duration: 1}}>
        

            <div>
            <div className='cover bg-slate-100'>
            <input type="file" placeholder='title'/></div>
            </div>
            
            <div>
            <input type="text" placeholder='artist' /></div>

            <div>
            <label>Title:</label>
            <input type="text" placeholder='title' /></div>

            <div>
            <input type="text" placeholder='album' /></div>

            <div>
            <input type="text" placeholder='genre' /></div>

            <div>
            <input type="file" placeholder='title' /></div>
           
        
        <p className='closeBtn' onClick={onClose}>X</p>
    </motion.div>
  )
}

export default AddSong