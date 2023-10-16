import React from "react";
import "../style/style.css";
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';


const Left = () => {
    return(
        <>
        <div class="left ">
            <span class="flex justify-center items-center font-medium text-2xl"><TfiLayoutMediaCenterAlt class="mr-2"/>MUSIC PLAYER WEB</span>
            <span>music library</span>
            <span>playlists</span>
        </div>
        </>
    )
};

export default Left;