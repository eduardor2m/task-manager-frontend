/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { NavBar } from '@/components/NavBar'
import { TaskCard } from '@/components/TaskCard'
import { useTask } from '@/hooks/useTask'
import styles from '@/styles/pages/Home.module.scss'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState<Task>({} as Task)

  const { getAll, create, task: allTasks } = useTask()

  useEffect(() => {
    const tasksFormatted = allTasks
    setTasks(tasksFormatted)

    if (allTasks.length === 0) {
      getAll().catch((error) => {
        console.log(error)
        alert('Sessão expirada, faça login novamente')
        router.push('/signin')
      })
    }
  }, [allTasks])

  function handleCreateTask() {
    const newTask = {
      title: 'task title',
      description: task.description,
      category: 'task category',
      status: false,
    }

    console.log(newTask)

    create(newTask)
      .then(() => {
        router.refresh()
      })
      .catch((error) => {
        console.log(error.message)
        alert('Sessão expirada, faça login novamente')
        router.push('/signin')
      })
  }

  return (
    <main className={styles.container}>
      <NavBar />
      <div className={styles.create_task}>
        <input
          className={styles.input_task}
          type="text"
          placeholder="Digite sua tarefa"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <button
          className={styles.button_task}
          onClick={() => handleCreateTask()}
        >
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
              <TaskCard key={task.id} data={task} />
            ))}
          </section>
        )}
      </section>
    </main>
  )
}
