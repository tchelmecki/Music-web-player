import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Left from '../components/Left';
import { FaPlus } from 'react-icons/fa';
import AddPlaylist from '../components/AddPlaylist';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';
import SongsPlaylist from './SongsPlaylist';

const Library = () => {
  axios.defaults.withCredentials = true;

  const [showAddPlaylist, setShowAddPlaylist] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [activeOptions, setActiveOptions] = useState(null);

  const addPlaylist = () => {
    setShowAddPlaylist(true);
  }

  useEffect(() => {
    const fetchAllPlaylists = async () => {
      try {
        const res = await axios.get("http://localhost:8800/playlists");
        setPlaylists(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllPlaylists();
  }, []);

  const handleDelete = async (playlistId) => {
    try {
      const response = await axios.delete(`http://localhost:8800/playlists/${playlistId}`);
      console.log('Playlist deleted successfully:', response.data);
      // window.location.reload();
    } catch (error) {
      console.error('Error deleting playlist:', error.message);
    }
  };

  const handleOptionsClick = (playlistId) => {
    setActiveOptions(playlistId === activeOptions ? null : playlistId);
  };

  const handleDeleteClick = (e, playlistId) => {
    e.stopPropagation(); //stop moving to another page
    handleDelete(playlistId);
  };

  return (
    <>
      <Left />
      <motion.div className="library-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, type: 'spring', duration: 1 }}>

        <div className="announce-add-playlist">
          <p>Your playlists:</p>
          <p>create a playlist</p>
          <div className='plus' onClick={addPlaylist}><FaPlus /></div>
        </div>
        <div className="playlist-list grid grid-cols-5">
        {playlists.map((library) => (
    <div className="playlist"
      >
    <Link to={`/library/playlist/${library.playlist_id}`} key={library.playlist_id} className="playlist-content">
      <div className="left-side-playlist">
        <div
          className="left-side-image"
          style={{
            backgroundImage: `url(src/assets/${library.cover})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'white',
          }}
        ></div>
      </div>
      <div className="name-playlist">
        <p>{library.name_playlist}</p> 
        {/* + " " + library.playlist_id */}
        <HiOutlineDotsVertical
          className={`HiOutlineDotsVertical ${library.playlist_id === activeOptions ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleOptionsClick(library.playlist_id);
          }}
        />
        <div className={`options ${library.playlist_id === activeOptions ? 'active' : ''}`}>
          <button className="hover:bg-slate-600 h-1/2" onClick={(e) => handleDeleteClick(e, library.playlist_id)}>
            Delete
          </button>
          <button className="hover:bg-slate-600 h-1/2" onClick={() => handleDelete(library.playlist_id)}>
            Update
          </button>
        </div>
      </div>
      </Link>
    </div>
  
))}

          {playlists.length === 0 && (
            <div className="announce-add-playlist">
              <p>Create your playlist!</p>
              <div className='plus' onClick={addPlaylist}><FaPlus /></div>
            </div>
          )}
        </div>
        <AddPlaylist showAddPlaylist={showAddPlaylist} setShowAddPlaylist={setShowAddPlaylist} />
      </motion.div>
    </>
  );
};

export default Library;
