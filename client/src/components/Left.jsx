import React from "react";
import "../style/style.css";
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { Link} from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { IoSettingsOutline } from "react-icons/io5";



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
            <Link to="/main"><span class="flex justify-center items-center font-medium text-2xl"><TfiLayoutMediaCenterAlt class="mr-2"/>MUSIC PLAYER WEB</span></Link>
            <span><Link to="/library">music library</Link></span>
            <span>playlists</span>
            <span><Link to="/songs">songs</Link></span>
            <span><Link to="/about">about</Link></span>
            <span onClick={handleLogout}>logout</span>
            <span className="pinion-ct flex items-center"><IoSettingsOutline  className="pinion"/></span>
        </div>
        </>
    )
};

export default Left;