import React from "react";
import "../style/style.css";
import contentImage from "../assets/content-image.png";

const Content = () => {
    return(
        <>
        <div className="content ">
            <div className="flex justify-end items-center w-1/2 h-full ">
            <div className="girl mr-20">
            </div>
            </div>
            <div className="info flex items-center w-1/2 h-full">
                <div className="info-text flex flex-col">
                <span className="tag">Media Player Web</span>
                <span>Enjoy music</span>
                <button className="bg-violet-950 w-1/2 mt-3 border rounded-md">Open files</button>
                </div>
            </div>
        </div>
        </>
    )
};

export default Content;