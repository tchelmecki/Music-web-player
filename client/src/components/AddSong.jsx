import React from 'react';
import "../style/style.css";

const AddSong = ({open, onClose}) => {
    if(!open) return null;
  return (
    <div className='overlay'>
        

            <div><label>Cover:</label>
            <input type="file" placeholder='title'/></div>
            
            <div>
            <label>Artist:</label>
            <input type="text" placeholder='artist' /></div>

            <div>
            <label>Title:</label>
            <input type="text" placeholder='title' /></div>

            <div>
            <label>Album:</label>
            <input type="text" placeholder='album' /></div>

            <div>
            <label>Genre:</label>
            <input type="text" placeholder='genre' /></div>

            <div>
            <label>File:</label>
            <input type="file" placeholder='title' /></div>
           
        
        <p className='closeBtn' onClick={onClose}>X</p>
    </div>
  )
}

export default AddSong