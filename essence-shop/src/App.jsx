
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
  SellNow, 
} from './pages/client';
import NotFound from './pages/NotFound';
import { ProtectedRoute } from './components';


function App() {
    const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/register' element={<Register/>}/>

      {/* protected routes */}
      <Route path='/profile/' element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Profile/>
        </ProtectedRoute>
      }/>

      <Route path='/sellNow' element={
         <ProtectedRoute isAuthenticated={isAuthenticated}>
          <SellNow/>
        </ProtectedRoute>
      }/>

      <Route path='/cart/' element={
         <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Cart/>
         </ProtectedRoute>
      }/>

      {/* Catch-all 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
