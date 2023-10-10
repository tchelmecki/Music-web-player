import React from "react";
import "../style/style.css";
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';


const Left = () => {
    return(
        <>
        <div class="left ">
            <span class=" flex justify-center items-center font-medium"><TfiLayoutMediaCenterAlt class="mr-2"/> MEDIA PLAYER WEB</span>
            <span>Music library</span>
            <span>Video library</span>
            <span>Playlists</span>
        </div>
        </>
    )
};

export default Left;