import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes, Link, NavLink, Navigate } from "react-router-dom";

import '../../css/app.css'
import Example from './Example';
import About from "./About";
import { Main } from './Main';
import { LoginPage } from './login/index';
import { Logout } from './login/Logout';
import { AuthProvider } from '../hooks/AuthContext'
import { useAuth } from '../hooks/AuthContext';
import { useLogout, useUser } from './AuthQuery';
import { getUser } from './AuthApi';
import { TryLogin } from './login/TryLogin';

const queryClient = new QueryClient()

export const Router = () => {
  const logout = useLogout()
  const { isAuth ,setIsAuth } = useAuth()
  const { isLoading, data: authUser } = useUser()

//   async function getData() {
//     try {
//       const response = await axios
//         .get('/api/user');
//       let data = response.data;
//       return data;
//     } catch (err) {
//       console.log("ERROR", err);
//     }
//   }

//   const hogeuser = () => {
//     getData().then(data => {
//       console.log(data)
//       if(data) {
//         console.log(true)
//       } else {
//         console.log(false)
//       }
//     }
//   );
//   }

// useEffect(() => {
//   getData().then(data => {
//       console.log(data)
//       if(data) {
//         console.log(true)
//       } else {
//         console.log(false)
//       }
//     }
//   );
// }, [authUser])

  
  // const getUserhoge = async () => {
  //   await axios.get('/api/user')
  //   .then(res => {
  //     const hoge = res.data
  //     return hoge
  //   })
  //   // return data
  // }
  // getUserhoge()
  // const { isLoading, data: authUser } = getUser()
  // console.log(isLoading)



  
  // useEffect(() => {
  //   if(getData().then(data => console.log(data))) {
  //     setIsAuth(true)
  //     console.log(isAuth)
  //   } else {
  //     console.log(authUser)
  //   }
  // }, [authUser])

  
  // const GuardRoute = (props) => {
  //   if(!isAuth) return <Navigate to="/loginpage"/>
  //   return <Route {...props}/>
  // }
  // const LoginRoute = (props) => {
  //   if(isAuth) return <Navigate to="/"/>
  //   return <Route {...props}/>
  // }

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
      <Logout />
      <NavLink style={linkStyle} to="/try_login">try_login</NavLink>
      <NavLink style={linkStyle} to="/">Example</NavLink>
      <NavLink style={linkStyle} to="/example">Example</NavLink>
      <NavLink style={linkStyle} to="/about">About</NavLink>
      <NavLink style={linkStyle} to="/loginpage">Login</NavLink>
      {/* <button onClick={hogeuser()}>取得</button> */}
    </div>
  )

  const loginHeader = (
    <div>
      <NavLink style={linkStyle} to="/try_login">try_login</NavLink>
      <NavLink style={linkStyle} to="/">Example</NavLink>
      <NavLink style={linkStyle} to="/example">Example</NavLink>
      <NavLink style={linkStyle} to="/about">About</NavLink>
      <NavLink style={linkStyle} to="/todo">Todo</NavLink>
      {/* <button onClick={hogeuser()}>取得</button> */}
      <Logout />
    </div>
  )
  // console.log(isAuth)
  
  return (
    <BrowserRouter>
      {isAuth ? loginHeader : header }
      <Routes>
        <Route path="/try_login" element={<TryLogin/>} />
        <Route path="/" element={<Example/>} />
        <Route path="/example" element={<Example/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/todo" element={ isAuth ? <Main/> : <Navigate to="/loginpage"/>} />
        <Route path="/loginpage" element={isAuth ? <Navigate to="/"/> : <LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
};
