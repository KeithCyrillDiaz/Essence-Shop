
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Route, Routes} from 'react-router-dom';

import { 
  Cart,
  Categories,
  Home, 
  LogIn, 
  Profile, 
  Register,
  SellNow, 
} from './pages/client';

import { 
  Admin,
  AdminLogin 
} from './pages/admin';

import { 
  AdminProtectedRoute, 
  ProtectedRoute 
} from './components';

import NotFound from './pages/NotFound';




function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/categories/:category' element={<Categories/>}/>

      {/* ADMIN */}

      <Route path='/admin' element={<AdminLogin/>}/>

      <Route path='/admin/home' element={
        <AdminProtectedRoute>
          <Admin/>
        </AdminProtectedRoute>
         
        }/>



      {/* protected routes */}
      <Route path='/profile/' element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      }/>

      <Route path='/sellNow' element={
         <ProtectedRoute>
          <SellNow/>
        </ProtectedRoute>
      }/>

      <Route path='/cart/' element={
         <ProtectedRoute>
            <Cart/>
         </ProtectedRoute>
      }/>



      {/* Catch-all 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
