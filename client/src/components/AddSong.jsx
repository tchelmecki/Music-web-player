import React, { useState } from 'react';
import "../style/style.css";
import { motion } from "framer-motion";
import AddInfo from './AddInfo';
import { FaCheck } from "react-icons/fa";

const AddSong = ({ open, onClose, playlistId, onUpload  }) => {
  const [openInfo, setOpenInfo] = useState(true);
  const [fileMusic, setFileMusic] = useState(null);
  const [fileCover, setFileCover] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');

  const handleFileMusicChange = (e) => {
    const file = e.target.files[0];
    setFileMusic(file);
  };

  const handleFileCoverChange = (e) => {
    const file = e.target.files[0];
    setFileCover(file);
  };

  const handleAddSong = () => {
    // sprawdzanie czy wszystkie pola zostały wypełnione
    if (!title || !artist || !album || !genre || !fileMusic || !fileCover) {
      console.log('Everything is required!');
      return;
    }

    const formData = new FormData();
    formData.append('musicFile', fileMusic);
    formData.append('coverImage', fileCover);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('album', album);
    formData.append('genre', genre);
    formData.append('playlistId', playlistId); 

    onUpload(formData)
      .then(() => {
        setOpenInfo(true);
      })
      .catch((error) => {
        console.error('Error transfering data to backend:', error);
        throw error;
      });
  };

  if (!open) return null;

  return (
    <motion.div className='overlay'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, type: 'spring', duration: 1 }}>

      <div>
        <div className='cover bg-slate-100'>
          <input type="file" onChange={handleFileCoverChange} />
        </div>
      </div>

      <div className=''>
        <input type="text" placeholder='artist' onChange={(e) => setArtist(e.target.value)} />
      </div>

      <div>
        <input type="text" placeholder='title' onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <input type="text" placeholder='album' onChange={(e) => setAlbum(e.target.value)} />
      </div>

      <div>
        <input type="text" placeholder='genre' onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div>
        <input type="file" onChange={handleFileMusicChange} />
      </div>

      <div className="buttons-yes-no flex">
      <div open={openInfo} className='add-record-accept' onClick={handleAddSong}>
        <FaCheck />
      </div>
    
      <div className='closeBtn' onClick={onClose}>x</div>
      <AddInfo open={openInfo} onClose={() => setOpenInfo(false)} />
      </div>
    </motion.div>
  )
}

export default AddSong;
