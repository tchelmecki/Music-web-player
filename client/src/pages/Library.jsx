import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

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
  },[]);

  const handleDelete = async (id) =>{
    try {
      await axios.delete("http://localhost:8800/library/"+id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
    <div>
      <h1>Library</h1>
      <div className="library">
        {playlists.map(library=>(
          <div className="playlist grid grid-rows-1 grid-flow-col gap-4 " key={library.studenci_id}>
            {/* <div className='bg-slate-400 text-center'>{library.studenci_id}</div> */}
           <div className='bg-slate-400 text-center'>{library.imie}</div>
           <div className="text-center bg-slate-500">{library.nazwisko}</div>
           <div className="text-center">{library.numer_indeksu}</div>
           <button className="hover:bg-slate-600" onClick={()=>handleDelete(library.studenci_id)}>Delete</button>
          </div>
        ))}
      </div>
      
      <button className="hover:bg-slate-600"><Link to="/add">Add position</Link></button>
    </div>
    </>
  )
}

export default Library;
