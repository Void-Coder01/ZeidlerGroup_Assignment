import { useContext, useState } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard';
import { userContext } from './store/user.context';
import { Loader } from 'lucide-react';

function App() {

  const { isAuthenticated,isLoading } = useContext(userContext);

  if(isLoading){
    return <Loader className='min-h-screen flex justify-center items-center animate-spin m-auto '/>
  }

  function ProtectedRoute({children}){
    
    if(!isAuthenticated){
      return <Navigate to='/login' />
    }
    return children;
  }

  function ProtectLoginAndSignup({children}){

    if(isAuthenticated){
      return <Navigate to='/Dashboard' />
    }
    return children;
  }

  return (
    <Routes>
      <Route path='/' element={
        <ProtectLoginAndSignup>
          <Home />
        </ProtectLoginAndSignup>
      } />
      
      <Route path="/signup" element={
        <ProtectLoginAndSignup>
          <Signup />
        </ProtectLoginAndSignup>}/>
      
      
      <Route path="/login" element={
        <ProtectLoginAndSignup>
          <Login />
        </ProtectLoginAndSignup>}/>


      <Route path="/Dashboard" element= {
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>}/>

      <Route path="*" element={"Page Not Found"}/>
    </Routes>
    
  )
}

export default App
