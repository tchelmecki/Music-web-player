import React, { useEffect, useState } from 'react';
import axios from "axios";

const Library = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchAllPlaylists = async () => {
      try{
        const res = await axios.get("http://localhost:8800/library");
        setPlaylists(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllPlaylists();
  },[])
  return (
    <>
    <div>
      <h1>Library</h1>
      <div className="library">
        {playlists.map(playlist=>(
          <div className="playlist" key={playlist.studenci_id}>
           <h2>{playlist.imie}</h2>
           <h2>{playlist.nazwisko}</h2>
           <h2>{playlist.numer_indeksu}</h2>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Library
