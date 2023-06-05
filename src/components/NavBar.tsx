'use client'

import styles from '@/styles/components/NavBar.module.scss'

import { useRouter } from 'next/navigation'

type INavBarProps = {
  data: {
    username: string
  }
}

export const NavBar = ({ data }: INavBarProps) => {
  const router = useRouter()
  return (
    <nav className={styles.container}>
      <section className={styles.wrapper_title}>
        <h1 className={styles.title}>Bem vindo de volta, {data.username}</h1>
        <p className={styles.subtitle}>
          Essas são as suas tarefas,{' '}
          <span
            onClick={() => {
              router.push('/signin')
            }}
          >
            sair
          </span>
        </p>
      </section>
    </nav>
  )
}
