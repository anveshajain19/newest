import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Main from './pages/Main';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import Chatbot from './Chatbot/Chatbot.jsx'

function App() {
  return (
    <>
      <div>
        <Toaster
          position='top-right'
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/editor/:roomId' element={<EditorPage/>}></Route>
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
