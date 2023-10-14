import './App.css'
import Content from './components/Content';
import Control from './components/Control';
import Left from './components/Left';
import Navbar from './components/Navbar';


function App() {

  return (
    <>
      <div className='body'>
      {/* <Navbar /> */}
      <Left />
      <Content />
      <Control />
      </div>
    </>
  )
}

export default App
