import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Left from '../components/Left';
import Control from '../components/Control';

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
    <Left />
    <div> 
      <div className="library">
        {playlists.map(library=>(
          <div className="playlist grid grid-rows-1 grid-flow-col gap-4 " key={library.id_users}>
            {/* <div className='bg-slate-400 text-center'>{library.studenci_id}</div> */}
           <div className='bg-slate-400 text-center'>{library.username}</div>
           <div className="text-center bg-slate-500">{library.email}</div>
           <div className="text-center">{library.pswd}</div>
           <button className="hover:bg-slate-600" onClick={()=>handleDelete(library.id_users)}>Delete</button>
          </div>
        ))}
      </div>
      
      <button className="hover:bg-slate-600"><Link to="/add">Add position</Link></button>
    </div>
    <Control />
    </>
  )
}

export default Library;
