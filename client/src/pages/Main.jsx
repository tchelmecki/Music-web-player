import React, { useEffect, useState } from 'react';
import Left from '../components/Left';
import Content from '../components/Content';
import Control from '../components/Control';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Main = () => {

  const [name, setName] = useState('');
  const navigate = useNavigate();


    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8800/main')
        .then( res => {
            if(res.data.valid){
                setName(res.data.username);
            } else{
                navigate('/login');
            }
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <>
      <Left/>
      <Content />
      {/* <Control /> */}
    </>
  )
}
