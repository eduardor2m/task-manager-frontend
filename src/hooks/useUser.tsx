/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
'use client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { getCookie, setCookie, deleteCookie } from 'cookies-next'

import { useRouter } from 'next/navigation'

type IUser = {
  token: string
}

interface IUserContextData {
  user: IUser
  signup: (username: string, email: string, password: string) => Promise<void>
  signin: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

interface IUserProviderProps {
  children: ReactNode
}

const UserContext = createContext<IUserContextData>({} as IUserContextData)

export function UserProvider({ children }: IUserProviderProps) {
  const route = useRouter()
  const [user, setUser] = useState<IUser>({} as IUser)
  const userCookieKey = '@taskmanager:user'

  async function userInStorage() {
    const getTokenFromCookie = getCookie(userCookieKey)?.valueOf().toString()
    const token = JSON.parse(getTokenFromCookie!).token

    if (token) {
      setUser(token)
    }
  }

  useEffect(() => {
    userInStorage()
  }, [])

  async function signup(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const response = await fetch('http://localhost:9090/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        cache: 'no-cache',
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
      } else {
        console.log('Error:', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async function signin(email: string, password: string): Promise<void> {
    try {
      const response = await fetch('http://localhost:9090/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        cache: 'no-cache',
      })

      if (response.ok) {
        const data = await response.json()
        // save token in local storage
        setUser(data.token)
        setCookie(userCookieKey, JSON.stringify(data))
        console.log(data)
      } else {
        console.log('Error:', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async function logout() {
    try {
      setUser({} as IUser)
      deleteCookie(userCookieKey)

      route.push('/')
    } catch {
      throw new Error('Erro ao sair')
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser(): IUserContextData {
  const context = useContext(UserContext)

  return context
}
