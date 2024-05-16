import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import '../style/library-container.css';

const AddPlaylist = ({ showAddPlaylist, setShowAddPlaylist, refreshPlaylists }) => {
  axios.defaults.withCredentials = true;

  const [newPlaylist, setNewPlaylist] = useState({
    name_playlist: '',
    coverImage: null, // New state for cover image
  });

  const handleCreatePlaylist = async () => {
    try {
      const formData = new FormData();
      formData.append('name_playlist', newPlaylist.name_playlist);
      formData.append('coverImage', newPlaylist.coverImage);

      const response = await axios.post(
        "http://localhost:8800/playlists",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const { user_id } = response.data;
        alert(`Playlist created successfully! User ID: ${user_id}`);
        setNewPlaylist({ name_playlist: '', coverImage: null });
        setShowAddPlaylist(false);
        window.location.reload();
      } else {
        alert('Error creating playlist');
      }
    } catch (error) {
      console.error('Error creating playlist:', error.message);
      alert('Error creating playlist');
    }
  };

  const handleChange = (field, value) => {
    setNewPlaylist((prevPlaylist) => ({
      ...prevPlaylist,
      [field]: value,
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setNewPlaylist((prevPlaylist) => ({
      ...prevPlaylist,
      coverImage: file,
    }));
  };

  return (
    <>
      {showAddPlaylist && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', duration: 1 }}
            className="block"
            onClick={() => setShowAddPlaylist(false)}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', duration: 1 }}
            className="modal"
          >
            <p>Add a playlist</p>
            <input
              type="text"
              placeholder="Enter a name of playlist"
              value={newPlaylist.name_playlist}
              onChange={(e) => handleChange('name_playlist', e.target.value)}
            />
            <input
              className='mt-4'
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
            />
            <div className="buttons-addplaylist">
              <button onClick={handleCreatePlaylist}>Create</button>
              <button onClick={() => setShowAddPlaylist(false)}>Close</button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default AddPlaylist;
