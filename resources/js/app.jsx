require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

import '../css/app.css'
import Example from './components/Example';
import About from "./components/About";
import { Main } from './components/Main';
import { LoginPage } from './components/login/index';
import { Logout } from './components/login/Logout';

const queryClient = new QueryClient()

const App = () => {

  const linkStyle =  {
    margin: '10px',
    color: 'blue',
    fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '5px',
    padding: '10px'
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavLink style={linkStyle} to="/">Example</NavLink>
        <NavLink style={linkStyle} to="/example">Example</NavLink>
        <NavLink style={linkStyle} to="/about">About</NavLink>
        <NavLink style={linkStyle} to="/todo">Todo</NavLink>
        <NavLink style={linkStyle} to="/loginpage">Login</NavLink>
        <Routes>
          <Route path="/" element={<Example/>} />
          <Route path="/example" element={<Example/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/todo" element={<Main/>} />
          <Route path="/loginpage" element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
      <Logout />
    </QueryClientProvider>
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}