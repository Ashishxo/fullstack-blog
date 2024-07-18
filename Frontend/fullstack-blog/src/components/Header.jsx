import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../userContext';

function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
 

  useEffect(()=>{
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response =>{
      response.json().then(userInformation => {
        setUserInfo(userInformation);
      })
    })

  }, []);

  function logout(){
    fetch('http://localhost:4000/logout', {
      method:'POST',
      credentials: 'include'
    });
    setUserInfo(null);
  }

  const username = userInfo?.username

  return (
    <header>
        <Link to="/" className="logo">My Blog</Link>
        <nav>

          {username ? (<>
            <Link to="/create">Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>) : <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>}
          
        </nav>
      </header>
  )
}

export default Header