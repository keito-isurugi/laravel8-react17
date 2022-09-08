import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

import {useAuth} from "./AuthContext";

const Home = () => {
  const navigation = useNavigate();
  const auth = useAuth()

  const logout = () => {
    axios.get('/sanctum/csrf-cookie').then(() => {
      auth?.signout().then(() => {
        navigation('/login');
      })
    })
  }
  return (
    <div className="p-4">
      <h1>Home</h1>
      <p>Hello! {auth?.user?.name}</p>
      <Button variant="contained" onClick={logout}>ログアウト</Button>
      {/* // アカウント情報を書く */}
    </div>
  )
}

export default Home;