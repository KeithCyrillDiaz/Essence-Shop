
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Route, Routes} from 'react-router-dom';
import { 
  Cart,
  Home, 
  LogIn, 
  Profile, 
  Register, 
} from './pages/client';
import NotFound from './pages/NotFound';


function App() {
 
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/cart/:id' element={<Cart/>}/>

      {/* Catch-all 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
