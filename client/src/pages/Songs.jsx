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
        <div className="">
        <div>
            <span>Author: </span> <span>Title: </span> <span> Genre: </span>
        </div>
        {song.map(songs=>(
          <div className="playlist grid grid-rows-1 grid-flow-col gap-4 " key={songs.songs_id}>
            {/* <div className='bg-slate-400 text-center'>{library.studenci_id}</div> */}
           <div className='bg-slate-400 text-center'>{songs.author}</div>
           <div className="text-center bg-slate-500">{songs.title}</div>
           <div className="text-center">{songs.genre}</div>
           {/* <button className="hover:bg-slate-600" onClick={()=>handleDelete(library.songs_id)}>Delete</button> */}
          </div>
        ))}
      </div>
        <Control />
        </>
    )
};

export default Songs;