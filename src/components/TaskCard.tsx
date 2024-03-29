'use client'

import styles from '@/styles/components/TaskCard.module.scss'
import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { AiOutlineCheck } from 'react-icons/ai'
import { useTask } from '@/hooks/useTask'

type ITaskCardProps = {
  data: {
    id: string
    title: string
    description: string
    category: string
    date: string
    status: boolean
  }
}

export const TaskCard = ({ data }: ITaskCardProps) => {
  const [status, setStatus] = useState(data.status)
  const { delete: deleteTask, updateStatus } = useTask()

  async function handleDeleteTask() {
    deleteTask(data.id)
  }

  async function handleUpdateTask() {
    await updateStatus(data.id)
      .then(() => {
        setStatus(!status)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.container}>
      <section className={styles.status}>
        <button
          style={{
            backgroundColor: status ? '#5E60CE' : 'transparent',
            border: status ? '1px solid #5E60CE' : '2px solid #4ea8de',
          }}
          className={styles.checkbox}
          onClick={() => handleUpdateTask()}
        >
          {status ? <AiOutlineCheck size={12} color="#f2f2f2" /> : null}
        </button>
      </section>
      <section className={styles.wrapper}>
        <p
          style={{
            textDecoration: status ? 'line-through' : 'none',
            color: status ? '#ccc' : '#f2f2f2',
          }}
          className={styles.description}
        >
          {data.description}
        </p>
      </section>
      <section className={styles.delete}>
        <button
          className={styles.delete_button}
          onClick={() => handleDeleteTask()}
        >
          <FiTrash2 color="#808080" size={22} />
        </button>
      </section>
    </div>
  )
}
