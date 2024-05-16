import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import "../style/style.css";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { motion } from "framer-motion";
import headpones from "../assets/headphones3D.png";
import Left from "../components/Left";
import Control from "../components/Control";
import { FaPlus } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import AddSong from '../components/AddSong';
import AddInfo from '../components/AddInfo';

const SongsPlaylist = (props) => {
  //============useStates=============
  const [song, setSong] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null); 
  const [openModal, setOpenModal] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [name, setName] = useState('');
  const [containerHeight, setContainerHeight] = useState('100svh');
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state ? location.state.user_id : null;


  const { playlistId } = useParams();
  axios.defaults.withCredentials = true;

  //============UseEffects=============
  useEffect(() => {
    axios
      .get('http://localhost:8800/songs')
      .then((res) => {
        if (res.data.valid) {
           //setName(res.data.username); // Nie jestem pewien, czy to nadal jest potrzebne
        } else {
          navigate('/login');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (props.location && props.location.state && props.location.state.user_id) {
      setUserId(props.location.state.user_id);
    }
  }, [props.location]);

  useEffect(() => {
    console.log("Otrzymany id playlisty:", playlistId);

    const fetchAllSongs = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/playlists/${playlistId}`);
        console.log('Fetched songs data:', res.data); 
        setSong(res.data);
      } catch (err) {
        console.error('Error fetching user songs:', err);
      }
    };
  
    fetchAllSongs();
  }, [playlistId]);

  //===============function================
  const playSelectedSong = (songs) => {
    setSelectedSong(songs);
    console.log("Selected song in songs:", songs);
    if (songs) {
      setContainerHeight('85svh');
    } else {
      setContainerHeight('100svh');
    }
  };

  const scrollToBottom = () => {
    addSongRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  const handleUpload = async (formData) => {
    try {
      const response = await fetch('http://localhost:8800/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', 
      });
  
      if (!response.ok) {
        console.error('Błąd podczas przesyłania danych na backend:', response.statusText);
        throw new Error('Błąd podczas przesyłania danych na backend');
      }
  
      const data = await response.json();
      console.log('Odpowiedź od backendu:', data);
      window.location.reload();
      
    } catch (error) {
      console.error('Błąd podczas przesyłania danych na backend:', error.message);

    }
  };

  //================useRef====================
  const addSongRef = useRef(null);

  

  return (
    <>
      <Left style={{ height: containerHeight }} />
      {selectedSong ? (
        <Control selectedSong={selectedSong} songs={song} />
      ) : null}
      <motion.div
        className="songs-container"
        style={{ height: containerHeight }}
        animate={{ height: containerHeight }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className='songs-etc'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', duration: 1 }}>
          <div className='w-1/6 flex justify-center'>ARTIST</div>
          <div className='w-1/6 flex justify-center '>TITLE</div>
          <div className='w-1/6 flex justify-center'>ALBUM</div>
          <div className='w-1/6 flex justify-center'>GENRE</div>
          <div className='w-1/6 flex justify-center'>{song.length > 0 ? song[0].name_playlist : ''}</div>
          <div className='plus' onClick={()=>{setOpenModal(true); scrollToBottom();}}><FaPlus /></div>
        </motion.div>
        {user_id && <p>User ID: {user_id}</p>}
        {user_id && <p>User ID: {user_id}</p>}
        {song.map((songs) => (
          <motion.div className="songs" key={songs.songs_id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', duration: 1 }}>
            <div className='songs-info' onClick={() => playSelectedSong(songs)}>
              <div className='flex justify-center items-center songs-record w-20 h-full '>
                <div
                  className='cover'
                  style={{
                    // backgroundImage: `url(../../src/assets/${songs.cover})`,
                    backgroundImage: `url(http://localhost:8800/assets/${songs.cover})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'white',
                  }}
                ></div>
              </div>
              <div className='songs-record w-60 h-full'>{songs.author}</div>
              <div className='songs-record w-60 h-full'>{songs.title}</div>
              <div className='songs-record w-60 h-full'>{songs.album}</div>
              <div className='songs-record w-60 h-full'>{songs.genre}</div>
              <div className='songs-record float-right flex justify-end w-96 h-full ml-20 text-2xl '>
                <span>
                  <HiOutlineDotsVertical />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={addSongRef}>
        <AddSong
          className='hover:bg-purple'
          open={openModal}
          onUpload={handleUpload} // Upewnij się, że ta funkcja jest zdefiniowana
          onClose={() => setOpenModal(false)}
          playlistId={playlistId} // Przekazanie playlistId jako props
        />


        </div>
      </motion.div>
    </>
  );
};

export default SongsPlaylist;
