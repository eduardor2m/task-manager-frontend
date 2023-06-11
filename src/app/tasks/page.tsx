'use client'

import { NavBar } from '@/components/NavBar'
import { TaskCard } from '@/components/TaskCard'
import styles from '@/styles/pages/Home.module.scss'
import { useEffect, useState } from 'react'

type Task = {
  id: string
  title: string
  description: string
  category: string
  date: string
  status: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    function getTasks() {
      fetch('http://localhost:9090/api/task', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
        cache: 'no-cache',
      })
        .then((response) => response.json())
        .then((data) => {
          const tasksFormatted = data.map((task: Task) => {
            return {
              id: task.id,
              title: task.title,
              description: task.description,
              category: task.category,
              date: task.date,
              status: task.status,
            }
          })
          setTasks(tasksFormatted)
        })
        .catch((error) => console.log(error))
    }

    getTasks()
  }, [])

  return (
    <main className={styles.container}>
      <NavBar
        data={{
          username: 'John Doe',
        }}
      />
      <section className={styles.list_tasks}>
        <h1 className={styles.title}>Tarefas</h1>
        <section className={styles.wrapper_tasks}>
          {tasks.map((task) => (
            <TaskCard key={task.title} data={task} />
          ))}
        </section>
      </section>
    </main>
  )
}
