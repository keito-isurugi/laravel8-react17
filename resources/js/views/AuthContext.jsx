import axios, { AxiosResponse } from "axios";
import React, {useContext, createContext, useState, ReactNode, useEffect} from "react"
import {Route, Navigate, useNavigate} from "react-router-dom"

const authContext = createContext(null)

const ProvideAuth = ({children}) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}
export default ProvideAuth

export const useAuth = () => {
  return useContext(authContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const register = (registerData) => {
    return axios.post('/api/register', registerData).then((res) => {
      axios.get('api/user').then((res) => {
        setUser(res.data)
      })
    })
  }

  const signin = async (loginData) => {
    try {
      const res = await axios.post('/api/login', loginData);
    } catch (error) {
      throw error;
    }

    return axios.get('/api/user').then((res) => {
      setUser(res.data)
    }).catch((error) => {
      setUser(null)
    })
  }

  const signout = () => {
    return axios.post('/api/logout', {}).then(() => {
      setUser(null)
    })
  }

  const saveProfile = async (formData) => {
    const res = await axios.post(
      '/api/user/profile-information', 
      formData, 
      {headers: {'X-HTTP-Method-Override': 'PUT'}}
    )
    .catch((error) => {
      throw error;
    })
    if(res?.status == 200) {
      return axios.get('/api/user').then((res) => {
        setUser(res.data)
      }).catch((error) => {
        setUser(null)
      })
    }
  }

  useEffect(() => {
    axios.get('/api/user').then((res) => {
      setUser(res.data)
    }).catch((error) => {
      setUser(null)
    })
  }, [])

  return {
    user,
    register,
    signin,
    signout,
    saveProfile
  }
}

/**
 * 認証済みのみアクセス可能
 */
export const PrivateRoute = ({element, path}) => {
  const auth = useAuth()
  return (
    <Route
      path={path}
      element={({ location }) => {
        if(auth?.user == null) {
          return <Navigate to={{ pathname: "/login", state: { from: location }}}/>
          // return <Navigate to="/login"/>
        } else {
          return element
        }
      }}
    />
  )
}


/**
 * 認証していない場合のみアクセス可能（ログイン画面など）
 */
export const PublicRoute = ({children, path, exact = false}) => {
  const auth = useAuth()
  const navigation = useNavigate()
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => {
        if(auth?.user == null) {
          return children
        } else {
          return <Navigate to={{pathname: (navigation.location.state) ? (navigation.location.state).from.pathname : '/' , state: { from: location }}}/>
        }
      }}
    />
  )
}

export const RouteAuthGuard = (props) => {
  const { component, redirect } = props
  const auth = useAuth()
  console.log(auth?.user)
  if(auth?.user == null) {
    return <Navigate to={redirect}/>
  }
  return component
}

export const RouteNoAuthGuard = (props) => {
  const { component, redirect } = props
  const auth = useAuth()
  console.log(auth?.user)
  if(auth?.user == null) {
    return component
  }
  return <Navigate to={redirect}/>
}