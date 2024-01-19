import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import Library from './pages/Library';
import Add from './pages/Add';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Songs from './pages/Songs';
import Login from './pages/Login';
import About from './pages/About';
import { MusicProvider } from '../MusicContext'; // Import dostawcy kontekstu

function App() {
  return (
    <MusicProvider>
      <div className="body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/main" element={<Main />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/library" element={<Library />} />
            <Route path="/add" element={<Add />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>
    </MusicProvider>
  );
}

export default App;
