import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import "../style/style.css";
import { Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { motion } from "framer-motion";
import headpones from "../assets/headphones3D.png";
import Left from "../components/Left";
import Control from "../components/Control";
import { FaPlus } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import AddSong from '../components/AddSong';
import AddInfo from '../components/AddInfo';


const Songs = (props) => {
  //states
   const [song, setSong] = useState([]);
   const [selectedSong, setSelectedSong] = useState(null); 
   const [openModal, setOpenModal] = useState(false);
   const [openInfo, setOpenInfo] = useState(false);
   const [containerHeight, setContainerHeight] = useState('100svh');


  //effects
  useEffect(() => {
    const fetchAllSongs = async () => {
      try{
        const res = await axios.get("http://localhost:8800/songs");
        setSong(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllSongs();
  },[]);

  //func
  const playSelectedSong = (song) => {
    setSelectedSong(song);
    console.log("Selected song in songs:", song);
    if (song) {
      setContainerHeight('85svh'); // Set the desired height
    } else {
      setContainerHeight('100svh'); // Reset to the default height
    }
  };

  //ref
  const addSongRef = useRef(null);


  const scrollToBottom = () => {
    addSongRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
        <Left style={{ height: containerHeight }} />
        {selectedSong ? (
        <Control selectedSong={selectedSong} songs={song} />) : null}
        <motion.div className="songs-container" style={{ height: containerHeight }} animate={{ height: containerHeight }}
        transition={{ duration: 0.3 }}>
        <div className='songs-etc'>
          <div className='w-1/6 flex justify-center'>ARTIST</div>
          <div className='w-1/6 flex justify-center '>TITLE</div>
          <div className='w-1/6 flex justify-center'>ALBUM</div>
          <div className='w-1/6 flex justify-center'>GENRE</div>
          <div className='plus' onClick={()=>{setOpenModal(true); scrollToBottom();}}><FaPlus /></div>
         
        </div>
        
            {song.map(songs=>(
                <div className="songs"  key={songs.songs_id}>
                    <div className='songs-info' onClick={() => playSelectedSong(songs)}>
                        <div className='flex justify-center items-center songs-record w-20 h-full '>
                          <div className='cover' 
                              style={{ backgroundImage: `url(src/assets/${songs.cover})`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              backgroundColor: 'white'}}>
                          </div>
                        </div>
                        <div className='songs-record w-60 h-full' >{songs.author}</div>
                        <div className='songs-record w-60 h-full'>{songs.title}</div>
                        <div className='songs-record w-60 h-full'>{songs.album}</div>
                        <div className='songs-record w-60 h-full'>{songs.genre}</div>
                        <div className='songs-record float-right flex justify-end w-96 h-full ml-20 text-2xl '><span><HiOutlineDotsVertical /></span></div>
                        {/* <div className='songs-record w-60 h-full'>{songs.file_path}</div>
                        <div className='songs-record w-60 h-full'>{songs.cover}</div> */}

  
                    </div>
                    {/* <audio src="../assets/music1.wav"></audio> */}
                </div>
            ))}
            <div ref={addSongRef}>
              <AddSong className='hover:bg-purple' open={openModal} onClose={() => setOpenModal(false)} />
            </div>
             {/* <div id="bottom" style={{ height: "1px", visibility: "hidden" }} /> */}


         
            
        </motion.div>
    </>
);

};

export default Songs;