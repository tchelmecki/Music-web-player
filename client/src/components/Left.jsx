import React from "react";
import "../style/style.css";
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { Link} from "react-router-dom";


const Left = () => {

    return(
        <>
        <div class="left ">
            <Link to="/main"><span class="flex justify-center items-center font-medium text-2xl"><TfiLayoutMediaCenterAlt class="mr-2"/>MUSIC PLAYER WEB</span></Link>
            <span><Link to="/library">music library</Link></span>
            <span>playlists</span>
            <span><Link to="/">logout</Link></span>
        </div>
        </>
    )
};

export default Left;