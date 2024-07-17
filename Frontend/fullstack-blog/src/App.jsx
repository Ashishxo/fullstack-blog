import { useState } from 'react'
import Home from './components/pages/Home'
import {Route, Routes} from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './components/pages/LoginPage'
import Register from './components/pages/Register'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>

      <Route path="/" element={<Layout/>}>

      <Route index element={
        <Home/>
      }/>

      <Route path={'/login'} element={
        <LoginPage/>
      } />

      <Route path={'/register'} element={
        <Register/>
      } />

      </Route>

      

  </Routes>
   
    
  )
}

export default App
