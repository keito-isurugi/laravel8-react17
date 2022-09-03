import React, { createContext, useState, useContext, Children } from "react";
import * as api from "./AuthApi"
import { useQuery, useMutation } from "@tanstack/react-query"
import { toast } from 'react-toastify'
import { useAuth, AuthContext } from "../hooks/AuthContext"

const useUser = () => {
  return useQuery('users', api.getUser)
}

const useLogin = () => {
  const { setIsAuth, isAuth } = useAuth()
  // const [isAuth, setIsAuth] = useContext(AuthContext)

  return useMutation(api.login, {
    onSuccess: (user) => {
      if(user) {
        setIsAuth(true)
        // console.log(isAuth)
      }
      // user && setIsAuth(true)
    },
    onError: () => {
      toast.error('ログインに失敗しました')
    }
  })
}

const useLogout = () => {
  const { setIsAuth } = useAuth()

  return useMutation(api.logout, {
    onSuccess: (user) => {
      if(user) {
        setIsAuth(false)
      }
    },
    onError: () => {
      toast.error('ログアウトに失敗しました')
    }
  })
}

export {
  useUser,
  useLogin,
  useLogout
}