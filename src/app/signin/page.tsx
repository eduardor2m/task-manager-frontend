'use client'

import styles from '@/styles/pages/SignIn.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type IUser = {
  email: string
  password: string
}

export default function SignIn() {
  const [user, setUser] = useState<IUser>({} as IUser)
  const router = useRouter()

  function handlePage(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault()
    console.log(user)
    router.push('/tasks')
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handlePage}>
        <h1 className={styles.title}>Task Manager</h1>
        <h3 className={styles.subtitle}>Faça login para acessar sua conta</h3>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            })
          }}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            })
          }}
        />
        <input className={styles.button} type="submit" value="Entrar" />
        <Link href="/">
          <p className={styles.link}>
            Não possui uma conta?<span> Cadastre-se</span>
          </p>
        </Link>
      </form>
    </main>
  )
}
