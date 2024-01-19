// Komponent Library
import React, { useState } from 'react';
import axios from 'axios';
import Left from '../components/Left';
import { FaPlus } from 'react-icons/fa';
import AddPlaylist from '../components/AddPlaylist';

const Library = () => {
axios.defaults.withCredentials = true;

  const [showAddPlaylist, setShowAddPlaylist] = useState(false);
  const addPlaylist = () => {
    setShowAddPlaylist(true);
  }
   

  return (
    <>
    <Left />
       <div className="library-container">
          <div className="announce-add-playlist">
            <p>Create your playlist!</p>
            <div className='plus' onClick={addPlaylist}><FaPlus /></div>
           </div>
            <AddPlaylist showAddPlaylist={showAddPlaylist} setShowAddPlaylist={setShowAddPlaylist} />
                {/* {showAddPlaylist && (
                    <div className="modal">
                        <p>Add a playlist</p>
                        <input
                            type="text"
                            placeholder="Enter a name of playlist"
                            value={newPlaylist.name_playlist}
                            onChange={(e) => handleChange('name_playlist', e.target.value)}
                        />
                        <div className="buttons-addplaylist">
                            <button onClick={handleCreatePlaylist}>Create</button>
                            <button onClick={() => setShowAddPlaylist(false)}>Close</button>
                        </div>
                    </div>
                )} */}
            </div>
        </>
    );
};

export default Library;
