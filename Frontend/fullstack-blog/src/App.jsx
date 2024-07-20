import { useState } from 'react'
import Home from './components/pages/Home'
import {Route, Routes} from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './components/pages/LoginPage'
import Register from './components/pages/Register'
import CreatePost from './components/pages/CreatePost'

import './App.css'
import { UserContextProvider } from './userContext'
import PostPage from './components/pages/PostPage'
import EditPost from './components/pages/EditPost'


function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
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

          <Route path={'/create'} element={
            <CreatePost/>
          } />

          <Route path='/post/:id' element={
            <PostPage/>
          }/>

          <Route path='/edit/:id'element={
            <EditPost/>
          }/>

          </Route>

      </Routes>
    </UserContextProvider>


    
   
    
  )
}

export default App
