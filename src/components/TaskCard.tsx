'use client'

import styles from '@/styles/components/TaskCard.module.scss'
import { useState } from 'react'

type ITaskCardProps = {
  data: {
    title: string
    description: string
    category: string
    date: string
    status: string
  }
}

export const TaskCard = ({ data }: ITaskCardProps) => {
  const [status, setStatus] = useState(false)
  return (
    <div className={styles.container}>
      <section className={styles.status}>
        <span
          className={styles.status_dot}
          onClick={() => setStatus(!status)}
          style={{
            backgroundColor: status ? '#00ff00' : '#f0f0f5',
          }}
        />
      </section>
      <section className={styles.wrapper}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.description}>{data.description}</p>
        <section className={styles.wrapper_footer}>
          <p className={styles.category}>{data.category}</p>
          <p className={styles.date}>{data.date}</p>
        </section>
      </section>
    </div>
  )
}
