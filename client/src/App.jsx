import './App.css'
import Content from './components/Content';
import Control from './components/Control';
import Left from './components/Left';
import Navbar from './components/Navbar';
import {render} from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from './pages/Main';
// import { Add } from './pages/Add';
import Library from './pages/Library';


function App() {

  return (
    <>
      <div className='body'>
      {/* <Navbar /> */}
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/library" element={<Library/>}/>
          {/* <Route path="/Add" element={<Add/>}/> */}

      </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
