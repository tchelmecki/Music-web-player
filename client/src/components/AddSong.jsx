import React, { useState } from 'react';
import "../style/style.css";
import { motion } from "framer-motion";
import AddInfo from './AddInfo';
import { FaCheck } from "react-icons/fa";

const AddSong = ({open, onClose}) => {
  const [openInfo, setOpenInfo] = useState(false);
  
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
           
        <div open={openInfo} className='add-record-accept' onClick={()=>setOpenInfo(true)}><FaCheck /></div>
        <div className='closeBtn' onClick={onClose}>x</div>
        <AddInfo  open={openInfo} onClose={()=>setOpenInfo(false)}/>

    </motion.div>
  )
}

export default AddSong