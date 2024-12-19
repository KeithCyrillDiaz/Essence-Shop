
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Route, Routes} from 'react-router-dom';
import { Home, LogIn, NotFound, Register } from './pages';

function App() {
 
  return (
    <Routes>
      <Route
      path='/'
      element={<Home/>}
      />
      <Route
      path='/login'
      element={<LogIn/>}
      />
      <Route
      path='/register'
      element={<Register/>}
      />

      {/* Catch-all 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
