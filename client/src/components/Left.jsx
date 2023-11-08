import React from "react";
import "../style/style.css";
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { Link} from "react-router-dom";


const Left = () => {

    return(
        <>
        <div class="left ">
            <span class="flex justify-center items-center font-medium text-2xl"><TfiLayoutMediaCenterAlt class="mr-2"/>MUSIC PLAYER WEB</span>
            <span><Link to="/library">music library</Link></span>
            <span>playlists</span>
        </div>
        </>
    )
};

export default Left;