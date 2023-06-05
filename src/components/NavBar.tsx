import styles from '@/styles/components/NavBar.module.scss'

import Link from 'next/link'

type INavBarProps = {
  data: {
    username: string
  }
}

export const NavBar = ({ data }: INavBarProps) => {
  return (
    <nav className={styles.container}>
      <section className={styles.wrapper_title}>
        <h1 className={styles.title}>Bem vindo de volta, {data.username}</h1>
        <p className={styles.subtitle}>
          Essas são as suas tarefas,{' '}
          <Link href="/logout">
            <span>sair</span>
          </Link>
        </p>
      </section>
    </nav>
  )
}
