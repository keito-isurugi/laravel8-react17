import React from 'react'
import axios from "axios";

export const TryLogin = () => {
  
  const login = () => {
    axios.get('/sanctum/csrf-cookie').then(response => {
      console.log(response)
      const email = "admin@email.com"
      const password = "admin"
      axios.post('/api/login', { email, password }).then(res => {
        console.log(res.data)
      })
  });
  }

  function getUser() {
    axios.get('/api/user').then(res => {
      console.log(res.data)
    })
  }

  return (
    <>
      <button onClick={login()}>login</button>
      <button onClick={getUser()}>getUser</button>
    </>
  )
}
