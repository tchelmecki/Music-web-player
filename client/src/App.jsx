import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from './pages/Main';
import Library from './pages/Library';
import Add from './pages/Add';
import Home from './pages/Home';
import Signup from './pages/Signup';


function App() {

  return (
    <>
      <div className='body'>
      {/* <Navbar /> */}
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/main" element={<Main/>}/>
          <Route path="/library" element={<Library/>}/>
          <Route path="/add" element={<Add/>}/>

      </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
