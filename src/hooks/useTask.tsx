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

import { getCookie } from 'cookies-next'

interface ITask {
  id: string
  title: string
  description: string
  category: string
  date: string
  status: boolean
}

interface ITaskDTO {
  title: string
  description: string
  category: string
  status: boolean
}

interface ITaskContextData {
  task: ITask[]
  create: (task: ITaskDTO) => Promise<void>
  update: (task: ITask) => Promise<void>
  delete: (id: string) => Promise<void>
  get: (id: string) => Promise<void>
  getAll: () => Promise<void>
}

interface ITaskProviderProps {
  children: ReactNode
}

const TaskContext = createContext<ITaskContextData>({} as ITaskContextData)

export function TaskProvider({ children }: ITaskProviderProps) {
  const [tasks, setTasks] = useState<ITask[]>([])

  const userCookieKey = '@taskmanager:user'

  useEffect(() => {
    getAll()
  }, [])

  async function create(task: ITaskDTO): Promise<void> {
    try {
      const getTokenFromCookie = getCookie(userCookieKey)?.valueOf().toString()
      const token = JSON.parse(getTokenFromCookie!).token
      const response = await fetch('http://localhost:9090/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
        body: JSON.stringify(task),
      })

      if (response.ok) {
        const data = await response.json()
        setTasks([...tasks, data])
      } else {
        throw new Error(response.statusText)
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function update(task: ITask): Promise<void> {
    try {
      const getTokenFromCookie = getCookie(userCookieKey)?.valueOf().toString()
      const token = JSON.parse(getTokenFromCookie!).token
      const response = await fetch(
        `http://localhost:9090/api/task/${task.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-cache',
          body: JSON.stringify(task),
        },
      )

      if (response.ok) {
        const data = await response.json()
        const index = tasks.findIndex((task) => task.id === data.id)
        tasks[index] = data
        setTasks([...tasks])
      } else {
        console.log('Error:', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async function deleteTask(id: string): Promise<void> {
    try {
      const getTokenFromCookie = getCookie(userCookieKey)?.valueOf().toString()
      const token = JSON.parse(getTokenFromCookie!).token
      const response = await fetch(`http://localhost:9090/api/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      })

      if (response.ok) {
        const index = tasks.findIndex((task) => task.id === id)
        tasks.splice(index, 1)
        setTasks([...tasks])
      } else {
        console.log('Error:', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async function get(id: string): Promise<void> {
    try {
      const getTokenFromCookie = getCookie(userCookieKey)?.valueOf().toString()
      const token = JSON.parse(getTokenFromCookie!).token
      const response = await fetch(`http://localhost:9090/api/task/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      })

      if (response.ok) {
        const data = await response.json()
        setTasks([...tasks, data])
      } else {
        console.log('Error:', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async function getAll(): Promise<void> {
    try {
      const getTokenFromCookie = getCookie(userCookieKey)?.valueOf().toString()
      const token = JSON.parse(getTokenFromCookie!).token
      const response = await fetch('http://localhost:9090/api/task', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      })

      if (response.ok) {
        const data = await response.json()
        setTasks(data)
        return data
      } else {
        throw new Error(response.statusText)
      }
    } catch (error: any) {
      throw new Error(error.message)
      // return error.message
    }
  }

  return (
    <TaskContext.Provider
      value={{
        task: tasks,
        create,
        update,
        delete: deleteTask,
        get,
        getAll,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTask(): ITaskContextData {
  const context = useContext(TaskContext)

  return context
}
