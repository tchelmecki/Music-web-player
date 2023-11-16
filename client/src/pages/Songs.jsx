import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../style/style.css";
import { Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { motion } from "framer-motion";
import headpones from "../assets/headphones3D.png";
import Left from "../components/Left";
import Control from "../components/Control";

const Songs = (props) => {

   const [song, setSong] = useState([]);

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

    return(
        <>
        <Left />
        <div className="songs-container">
        {/* <div>
            <span>Author: </span> <span>Title: </span> <span> Genre: </span>
        </div> */}
        {song.map(songs=>(
          <div className="songs" key={songs.songs_id}>
            {/* <div className='bg-slate-400 text-center'>{library.studenci_id}</div> */}
            <div className='songs-info'>
              <div className='flex justify-center items-center songs-record w-20 h-full '><div className='cover'></div></div>
              <div className='songs-record w-60 h-full' >{songs.author}</div>
              <div className='songs-record w-60 h-full'>{songs.title}</div>
              <div className='songs-record w-60 h-full'>{songs.genre}</div>
            </div>
           {/* <button className="hover:bg-slate-600" onClick={()=>handleDelete(library.songs_id)}>Delete</button> */}

           <audio src="../assets/music1.wav"></audio>
          </div>
        ))}
      </div>
        <Control />
        </>
    )
};

export default Songs;