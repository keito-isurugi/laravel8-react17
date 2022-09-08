require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

import { BrowserRouter, Route, Routes, Link, NavLink, Navigate } from "react-router-dom";
// import { AuthProvider } from './hooks/AuthContext'

// import { Router } from './components/Router';

// import { Auth } from './Auth';

import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Top from './views/Top'
import ProvideAuth, { PrivateRoute, PublicRoute, RouteAuthGuard, RouteNoAuthGuard } from './views/AuthContext'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top/>} />
          <Route path="/register" element={<Register/>} />
          {/* <Route path="/login" element={<RouteNoAuthGuard component={<Login/>} redirect="/home" />} /> */}
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/home" element={<RouteAuthGuard component={<Home/>} redirect="/login" />} /> */}
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </ProvideAuth>


    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Auth/>} />
    //   </Routes>
    // </BrowserRouter>


    // <AuthProvider>
    //   <QueryClientProvider client={queryClient}>
    //     <Router/>
    //   </QueryClientProvider>
    // </AuthProvider>


  );
};

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}