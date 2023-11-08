import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Add = () => {
  
  const [library, setLibrary] = useState({
    imie: "",
    nazwisko: "",
    numer_indeksu: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) =>{
    setLibrary((prev) => ({...prev, [e.target.name]: e.target.value}));

  }

  const handleClick = async e =>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/library",library);
      navigate("/library");
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
    <div className=''>
      <h1>Add</h1>
      <input type="text" placeholder='imie' onChange={handleChange} name='imie'/>
      <input type="text" placeholder='nazwisko' onChange={handleChange} name='nazwisko'/>
      <input type="number" placeholder='numer indeksu' onChange={handleChange} name='numer_indeksu'/>
      <button onClick={handleClick}>Add</button>
    </div>
    </>
  )
}

export default Add;
