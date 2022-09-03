import React, { createContext, useState, useContext, Children } from "react";
import { useAuth } from "./hooks/AuthContext"

export const Hoge = () => {
  const {isAuth, setIsAuth} = useAuth()

  const changeIsAuth = () => {
    setIsAuth(true)
    console.log(isAuth)
  }
  return (
    <>
      <h1>useContext test</h1>
      <button onClick={changeIsAuth}>change isAuth</button>
    </>
  )
}