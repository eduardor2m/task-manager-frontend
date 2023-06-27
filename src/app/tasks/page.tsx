'use client'

import { NavBar } from '@/components/NavBar'
import { TaskCard } from '@/components/TaskCard'
import { useUser } from '@/hooks/useUser'
import styles from '@/styles/pages/Home.module.scss'
import { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { BiTaskX } from 'react-icons/bi'

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
  const { user } = useUser()

  useEffect(() => {
    const token = user
    console.log('token:', token)
    function getTasks() {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/task`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
  }, [user])

  return (
    <main className={styles.container}>
      <NavBar />
      <div className={styles.create_task}>
        <input
          className={styles.input_task}
          type="text"
          placeholder="Digite sua tarefa"
        />
        <button className={styles.button_task}>
          Criar{' '}
          <AiOutlinePlusCircle
            size={20}
            style={{
              marginLeft: '5px',
            }}
          />
        </button>
      </div>
      <section className={styles.list_tasks}>
        <div className={styles.info_list_tasks}>
          <div className={styles.info_list_tasks_created}>
            <h3>Tarefas criadas</h3>
            <p>0</p>
          </div>
          <div className={styles.info_list_tasks_completed}>
            <h3>Concluídas</h3>
            <p>0</p>
          </div>
        </div>
        {tasks.length === 0 ? (
          <section className={styles.empty}>
            <section className={styles.empty_icon}>
              <BiTaskX size={100} />
            </section>
            <section className={styles.empty_text}>
              <h3>Você não tem tarefas cadastradas</h3>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </section>
          </section>
        ) : (
          <section className={styles.wrapper_tasks}>
            {tasks.map((task) => (
              <TaskCard key={task.title} data={task} />
            ))}
          </section>
        )}
      </section>
    </main>
  )
}
