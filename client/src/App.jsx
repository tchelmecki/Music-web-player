import './App.css'
import Content from './components/Content';
import Control from './components/Control';
import Left from './components/Left';
import Navbar from './components/Navbar';
import {render} from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from './pages/Main';
import Library from './pages/Library';
import Add from './pages/Add';


function App() {

  return (
    <>
      <div className='body'>
      {/* <Navbar /> */}
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/library" element={<Library/>}/>
          <Route path="/add" element={<Add/>}/>

      </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
