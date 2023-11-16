import React from "react";
import "../style/style.css";
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { Link} from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";



const Left = () => {
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
        <div class="left "
             initial={{ opacity: 0}}
             animate={{ opacity: 1}}
             transition={{ delay: 0.2,  type: 'spring', duration: 2}}>
            <Link to="/main"><span class="flex justify-center items-center font-medium text-2xl"><TfiLayoutMediaCenterAlt class="mr-2"/>MUSIC PLAYER WEB</span></Link>
            <span><Link to="/library">music library</Link></span>
            <span>playlists</span>
            <span><Link to="/songs">songs</Link></span>
            <span><Link to="/about">about</Link></span>
            <span onClick={handleLogout}>logout</span>
        </div>
        </>
    )
};

export default Left;