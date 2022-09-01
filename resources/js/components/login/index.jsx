import React, { useState } from "react";
import { useLogin } from "../AuthQuery"

export const LoginPage = () => {
  const login = useLogin()
  const [email, setEmail] = useState('admin@email.com')
  const [password, setPassword] = useState('admin')

  const handleLogin = (e) => {
    e.preventDefault()
    login.mutate({ email, password })
  }
  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="">email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="">password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <button type="submit">ログイン</button>
        </form>
      </div>
    </div>
  )
}