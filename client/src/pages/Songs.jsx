import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import "../style/style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const Songs = (props) => {
  // states
  const [song, setSong] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null); 
  const [openModal, setOpenModal] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [name, setName] = useState('');
  const [containerHeight, setContainerHeight] = useState('100svh');
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state ? location.state.user_id : null;

  axios.defaults.withCredentials = true;

  // effects
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
    const fetchAllSongs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/user-songs");
        console.log('Fetched songs data:', res.data); // Log the fetched data
        setSong(res.data);
      } catch (err) {
        console.error('Error fetching user songs:', err);
      }
    };
  
    fetchAllSongs();
  }, []);

  const handleUpload = (formData) => {
    return fetch('http://localhost:8800/upload', {
      method: 'POST',
      body: formData,
      // Dodaj odpowiednie nagłówki, jeśli to konieczne
    })
      .then(response => response.json())
      .then(data => {
        console.log('Odpowiedź od backendu:', data);
        // Obsługa odpowiedzi od backendu
      })
      .catch(error => {
        console.error('Błąd podczas wysyłania danych na backend:', error);
        throw error;
      });
  };

  // func
  const playSelectedSong = (songs) => {
    setSelectedSong(songs);
    console.log("Selected song in songs:", songs);
    if (songs) {
      setContainerHeight('85svh');
    } else {
      setContainerHeight('100svh');
    }
  };

  // ref
  const addSongRef = useRef(null);

  const scrollToBottom = () => {
    addSongRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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
          <div className='absolute right-5' onClick={()=>{setOpenModal(true); scrollToBottom();}}>All your songs</div>
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
            onUpload={handleUpload}
            onClose={() => setOpenModal(false)}
          />
          {/* <AddInfo/> */}
        </div>
      </motion.div>
    </>
  );
};

export default Songs;
