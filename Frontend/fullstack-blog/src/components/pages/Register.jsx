import React, { useState } from 'react'

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(event){
    event.preventDefault();

    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
    })

    if (response.status === 200){
      alert('Success!');
    } else {
      alert('Registration failed.')
    }
  }

  return (
    <form className='register'>
        <h1>Register</h1>
        <input type="text" placeholder='Username' value={username} onChange={(ev) => setUsername(ev.target.value)}/>
        <input type="password" placeholder='Password' value={password} onChange={(ev) => setPassword(ev.target.value)}/>
        <button onClick={register}>Register</button>
    </form>
  )
}

export default Register