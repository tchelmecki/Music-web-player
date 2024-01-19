import React, { useState } from "react";
import "../style/style.css";
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { Link} from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { IoSettingsOutline } from "react-icons/io5";
import { PiPlaylistBold } from "react-icons/pi";
import { LuPlus } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { PiMicrophoneStageBold } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import AddPlaylist from "./AddPlaylist";

const Left = ({ containerHeight }) => {

  
    const handleLogout = async () => {
        try {
          await axios.post("http://localhost:8800/logout");
          // Po poprawnym wylogowaniu, możesz przekierować użytkownika na stronę logowania lub inny ekran
          window.location.href = "/login";
        } catch (error) {
          console.error("Błąd podczas wylogowywania:", error);
        }
      };

    

    return(
        <>
        <div class="left"
             style={{ height: containerHeight }}
             >

            <Link to="/songs"><span class="flex  items-center font-medium text-2xl">MUSIC WEB PLAYER </span></Link>
            <span class="flex  items-center font-medium text-2xl"><input type="text" placeholder="search..." className="w-4/6 pl-2 bg-white text-xl text-purple rounded"/></span>

            <div className="your-library flex justify-center items-center"><span className="flex items-center w-full "><PiPlaylistBold  className="mr-1 " /><Link to="/library"> your library </Link></span></div>

            {/* <span>Your library</span> */}
            {/* <span>playlists</span> */}
            <span><Link to="/songs"><p className="flex items-center"><PiMicrophoneStageBold className="mr-1"/>songs</p></Link></span>
            <span onClick={handleLogout}><p className="flex items-center"><HiOutlineLogout className="mr-1"/>logout</p></span>
            <span className="pinion-ct "><div className="stay-settings flex items-center"><IoSettingsOutline  className="pinion"/> settings</div>
            <span className="about-pinion"><Link to="/about">about</Link></span>
            </span>

        </div>
        </>
    )
};

export default Left;