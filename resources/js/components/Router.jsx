import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

import '../../css/app.css'
import Example from './Example';
import About from "./About";
import { Main } from './Main';
import { LoginPage } from './login/index';
import { Logout } from './login/Logout';
import { AuthProvider } from '../hooks/AuthContext'
import { useAuth } from '../hooks/AuthContext';
import { useLogout, useUser } from './AuthQuery';

const queryClient = new QueryClient()

export const Router = () => {

  const logout = useLogout()
  const { isAuth ,setIsAuth } = useAuth()

  const linkStyle =  {
    margin: '10px',
    color: 'blue',
    fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '5px',
    padding: '10px'
  }

  const header = (
    <div>
      <NavLink style={linkStyle} to="/">Example</NavLink>
      <NavLink style={linkStyle} to="/example">Example</NavLink>
      <NavLink style={linkStyle} to="/about">About</NavLink>
      <NavLink style={linkStyle} to="/loginpage">Login</NavLink>
    </div>
  )

  const loginHeader = (
    <div>
      <NavLink style={linkStyle} to="/">Example</NavLink>
      <NavLink style={linkStyle} to="/example">Example</NavLink>
      <NavLink style={linkStyle} to="/about">About</NavLink>
      <NavLink style={linkStyle} to="/todo">Todo</NavLink>
      <Logout />
    </div>
  )
  // console.log(isAuth)
  
  return (
    <BrowserRouter>
      {isAuth ? loginHeader : header }
      <Routes>
        <Route path="/" element={<Example/>} />
        <Route path="/example" element={<Example/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/todo" element={<Main/>} />
        <Route path="/loginpage" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
};
