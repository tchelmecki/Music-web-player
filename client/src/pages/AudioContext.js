// AudioContext.js
import React, { createContext, useState, useRef } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef();

  const playPauseToggle = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, playPauseToggle, audioPlayer }}>
      {children}
    </AudioContext.Provider>
  );
};
